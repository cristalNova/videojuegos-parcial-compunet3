import { NotFoundException } from "@nestjs/common";

export class PlayerNotFoundException extends NotFoundException{
    constructor(playerId: number, internalCode?: string){
        super({
            error: 'User Not Found',
            message: `User with id ${playerId} was not found`,
            code: internalCode,
        });
    }
}