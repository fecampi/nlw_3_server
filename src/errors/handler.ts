import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

//Capturar os erros
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    //Se for um erro de validação
    if(error instanceof ValidationError) {

        //Objeto com nome_do_campo : erros[]
        let errors: ValidationErrors = {};

        //Percorre todos os erros para retornar de uma maneira mais legível
        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });
        //Retorno o erro de uma maneira diferente,listando os erros
        return response.status(400).json({ message: 'Validation fails', errors });
    }

    console.log(error);
    //Se não...erro comum
    return response.status(500).json({ message: 'Internal server error'});
}

export default errorHandler;