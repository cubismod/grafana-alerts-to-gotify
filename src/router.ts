import { Get, Middleware, Router } from '@discordx/koa';
import { RouterContext } from '@koa/router';
import { Context, Next } from 'koa';
import koaCompress from 'koa-compress';
import koaHtmlMinifier from 'koa-html-minifier';
import { logger } from './logger';

async function logRequest(ctx: RouterContext, next: Next) {
  logger.info(logger.info({
    url: ctx.URL.pathname,
    headers: ctx.headers,
    status: ctx.response.status,
    ips: ctx.ips

  }));
}

@Router()
@Middleware(logRequest)
@Middleware(koaCompress())
@Middleware(koaHtmlMinifier({
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  sortAttributes: true,
  sortClassName: true
}))
export class HTTPRouter {
 @Get('/status')
  async home(context: Context) {
    context.body = 'https://github.com/cubismod/grafana-alerts-to-gotify';
  }
}
