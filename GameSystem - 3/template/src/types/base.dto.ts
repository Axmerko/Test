import {IsNotEmpty, Length} from "class-validator";

export class IdParam {
    @IsNotEmpty({ message: 'Id is required' })
    @Length(24, 24, { message: 'Id must have 24 characters' })
    id?: string;
}

export class SearchQuery {
    @IsNotEmpty({ message: 'Search query is required' })
    @Length(2, 50, { message: 'Search query must have between 2 and 50 characters' })
    query?: string;
}
