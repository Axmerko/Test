import { IsString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class TradeItemDto {
    @IsString()
    itemId!: string;

    @IsString()
    playerItemId!: string;
}

export class TradeDto {
    @IsString()
    fromPlayerId!: string;

    @IsString()
    toPlayerId!: string;

    @IsArray()
    //@ArrayMinSize(1) <-- DONT USE THIS TO ALLOW EMPTY TRADES | Check it in service manually if needed
    @ValidateNested({ each: true })
    @Type(() => TradeItemDto)
    fromItems!: TradeItemDto[];

    @IsArray()
    //@ArrayMinSize(1) <-- DONT USE THIS TO ALLOW EMPTY TRADES | Check it in service manually if needed
    @ValidateNested({ each: true })
    @Type(() => TradeItemDto)
    toItems!: TradeItemDto[];
}
