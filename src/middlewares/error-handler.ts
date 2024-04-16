import CustomError from "../errors/custom-error";

import { Response, Request } from "express";

const errorHandlerMiddleware = (
    err: CustomError | Error,
    req: Request,
    res: Response,
    {}
): Response => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            errors: {
                message: err.name,
                meta: err.message
            },
            result: null
        });
    }

    return res.status(500).json({
        errors: {
            message: err.name,
            meta: err.message
        },
        result: null
    });
};

export default errorHandlerMiddleware;
