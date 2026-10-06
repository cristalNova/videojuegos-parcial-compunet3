import { NotFoundException } from "@nestjs/common";

export class SessionNotFoundException extends NotFoundException{
    constructor(sessionId: number, internalCode?: string){
        super({
            error: 'Session Not Found',
            message: `Session with id ${sessionId} was not found`,
            code: internalCode,
        });
    }
}