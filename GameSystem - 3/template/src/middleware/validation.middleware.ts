import 'reflect-metadata';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {ApiError} from "../types/api.error";
import {Request} from 'express';

async function validateData<T>(data: any, type: new () => T): Promise<T> {
    const instance = plainToInstance(type, data);
    const errors = await validate(instance as object);

    if (errors.length > 0) {
        const errorMessage = errors
            .map((error) => {
                if (error.constraints) {
                    return Object.values(error.constraints);
                }
                // Handle nested validation errors
                if (error.children && error.children.length > 0) {
                    return error.children
                        .map(child => child.constraints ? Object.values(child.constraints) : [])
                        .flat();
                }
                return [];
            })
            .flat()
            .join(", ")
        throw new ApiError('bad input', errorMessage, 400)
    }

    return instance;
}

export async function validateParams<T>(req: Request, type: new () => T): Promise<T> {
    return await validateData(req.params, type) as T;
}

export async function validateQuery<T>(req: Request, type: new () => T): Promise<T> {
    return await validateData(req.query, type) as T;
}

export async function validateBody<T>(req: Request, type: new () => T): Promise<T> {
    return await validateData(req.body, type) as T;
}