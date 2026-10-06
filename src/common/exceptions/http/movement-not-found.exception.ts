import { NotFoundException } from "@nestjs/common";

export class MovementNotFoundException extends NotFoundException{
    constructor(movId: number, internalCode?: string){
        super({
            error: 'Movement Not Found',
            message: `Movement with id ${movId} was not found`,
            code: internalCode,
        });
    }
}