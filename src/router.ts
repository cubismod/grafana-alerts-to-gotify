import { Get, Middleware, Router } from '@discordx/koa';
import { RouterContext } from '@koa/router';
import { Context, Next } from 'koa';
import koaCompress from 'koa-compress';
import { logger } from './logger';

async function logRequest(ctx: RouterContext, next: Next) {
  await next();
  logger.info({
    url: ctx.URL.pathname,
    status: ctx.response.status,
    ip: ctx.ip,
    headers: ctx.headers
  });
}

@Router()
@Middleware(logRequest)
@Middleware(koaCompress())
export class HTTPRouter {
 @Get('/')
  home(context: Context) {
    context.body = 'https://github.com/cubismod/grafana-alerts-to-gotify';
  }

  @Get('/status')
 status(context: Context) {
   context.status = 200;
 }
}
