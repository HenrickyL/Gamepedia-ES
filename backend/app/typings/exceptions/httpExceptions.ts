
class HTTPException extends Error{
    statusCode: number
    constructor(message: string, statusCode: number){
        super(message)
        this.statusCode = statusCode
    }
}

export class NotFoundError extends HTTPException {
    constructor(message: string){
        super(message, 404)
    }
}

export class BadRequestError extends HTTPException {
    constructor(message: string){
        super(message, 400);
    }
}

export class InternError extends HTTPException {
    constructor(message: string){
        super(message, 500);
    }
}

export class InvalidValueError extends HTTPException {
    constructor(message: string){
        super(message, undefined);
    }
}