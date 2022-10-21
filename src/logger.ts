import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.colorize({ all: true }),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ]
});
