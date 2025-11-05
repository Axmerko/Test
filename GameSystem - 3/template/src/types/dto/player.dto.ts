import { IsString, IsEmail, MinLength, IsDefined } from 'class-validator';

export class PlayerDto {
    @IsString()
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @IsDefined()
    username!: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsDefined()
    email!: string;

    @IsString()
    @MinLength(1) // Testy nekontrolují délku, ale 'IsString' je minimum
    @IsDefined()
    displayName!: string;
}