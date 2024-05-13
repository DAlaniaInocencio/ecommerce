import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';


@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fechaHora = new Date().toISOString();
    console.log(`[${fechaHora}] ${req.method} ${req.path} `);

    next();
  }
}

export function LoggingGlobalMiddleware (
  req: Request, res: Response, next: NextFunction
) {
  const fechaHora = new Date();
  const formatFechaHora = format(fechaHora, 'yyyy-MM-dd HH:mm:ss');
  console.log(`Ejecutando Middleware Global: método ${req.method} a la ruta ${req.url} siendo [${formatFechaHora}]`);
    next();
}