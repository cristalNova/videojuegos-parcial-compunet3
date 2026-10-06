import { NotFoundException } from "@nestjs/common";

export class RoundNotFoundException extends NotFoundException{
    constructor(roundId: number, internalCode?: string){
        super({
            error: 'Round Not Found',
            message: `Round with id ${roundId} was not found`,
            code: internalCode,
        });
    }
}