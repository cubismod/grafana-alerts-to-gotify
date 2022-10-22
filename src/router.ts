import { Get, Middleware, Post, Router } from '@discordx/koa';
import { RouterContext } from '@koa/router';
import { Context, Next } from 'koa';
import koaCompress from 'koa-compress';
import PQueue from 'p-queue';
import { sendWebhook } from './gotify';
import { logger } from './logger';
import { AlertManager, Grafana } from './webhooks';

async function logRequest(ctx: RouterContext, next: Next) {
  logger.info({
    url: ctx.URL.pathname,
    ip: ctx.ip,
    headers: ctx.headers
  });
  await next();
  logger.info({
    status: ctx.response.status
  });
}

async function authCheck(ctx: RouterContext, next: Next) {
  if (ctx.headers['www-authenticate']?.startsWith('Basic') &&
  ctx.headers.authorization === process.env.AUTH) {
    await next();
  } else {
    ctx.status = 401;
    logger.warning(`Unauthorized request from ${ctx.ip}`);
  }
}

@Router()
@Middleware(logRequest)
@Middleware(koaCompress())
export class HTTPRouter {
  pq = new PQueue({
    concurrency: 6
  });

  @Get('/')
  home(context: Context) {
    context.body = 'https://github.com/cubismod/grafana-alerts-to-gotify';
  }

  @Post('/webhook/.+')
  @Middleware(authCheck)
  async webhook(context: Context) {
    const command = context.url.split('/')[1];
    try {
      let success = false;
      if (command === 'grafana') {
        const grafanaWebhook = new Grafana.Webhook(context.body);
        success = await sendWebhook(grafanaWebhook, this.pq);
      }
      if (command === 'alertmanager') {
        const alertManagerWebhook = new AlertManager.Webhook(context.body);
        success = await sendWebhook(alertManagerWebhook, this.pq);
      }

      if (!success) {
        context.status = 400;
      }
    } catch (err) {
      if (err instanceof TypeError) {
        context.status = 400;
        logger.error('Unable to parse JSON POST');
        logger.error(context.body);

        context.body = 'Unable to parse JSON request';
      } else {
        context.status = 500;
        logger.error(err);
      }
    }
  }

  @Get('/status')
  status(context: Context) {
    context.status = 200;
  }
}
