import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';









const valid = (schema: AnyZodObject) => 



    (req:Request, res:Response, next:NextFunction) => {


        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
                headers: req.headers
            });
            next();


            
        } catch (err) {
            const ZodError = err as ZodError;

            return res.status(400).json({
                message: ZodError.errors[0].message
            });
        }
    };

    export default valid;