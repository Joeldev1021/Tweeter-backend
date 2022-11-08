import { Request, Response, NextFunction } from 'express';
import { ApplicationException } from '../../application/errors/application.exception';
import { DomainFormatException } from '../../domain/errors/domain.format.exception';
import { InfrastructureFormatException } from '../errors/infrastruture.format.exception';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.message)
    if (error instanceof DomainFormatException || error instanceof InfrastructureFormatException) {
        return res.status(400).send({ errorMessage: error.message })
    }

    if (error instanceof ApplicationException) {
        return res.status(409).json({ errorMessage: error.message });
    }

    res.status(500).send({ errorMessage: error.message })
}