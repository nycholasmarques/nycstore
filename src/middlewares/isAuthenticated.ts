import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: Function) {
    // Receber o token
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Validar se token é valido
        const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

        //recuperar id do token e colocar dentro de uma variavel o request
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }
}