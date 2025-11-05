import { IsString, IsNumber, IsBoolean, Min, IsIn, MinLength } from 'class-validator';


export class ItemDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @IsDefined()
    name!: string;

    @IsString()
    @MinLength(5, { message: 'Description must be at least 5 characters long' })
    @IsDefined()
    description!: string;

    @IsIn(['common', 'rare', 'epic', 'legendary'], { message: 'Invalid rarity' })
    @IsDefined()
    rarity!: 'common' | 'rare' | 'epic' | 'legendary';

    @IsNumber()
    @Min(0, { message: 'Value cannot be negative' })
    @IsDefined()
    value!: number;

    @IsBoolean()
    @IsDefined()
    tradeable!: boolean;
}
