import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = HttpStatus.BAD_REQUEST;
    const message = 'Validation failed (uuid is expected)';

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Bad Request',
    });
  }
}
