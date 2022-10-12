import { Request, Response, ErrorRequestHandler } from 'express';
import { DomainFormatException } from '../../domain/errors/domain.format.exception';
import { InfrastructureFormatException } from '../errors/infrastruture.format.exception';

export const errorMiddleware: ErrorRequestHandler = (error: Error, req: Request, res: Response) => {

    if (error instanceof DomainFormatException || error instanceof InfrastructureFormatException) {
        return res.status(400).send({ errorMessage: error.message })
    }

    res.status(500).send({ errorMessage: error.message })
}