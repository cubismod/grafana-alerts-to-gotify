import got from 'got';
import PQueue from 'p-queue';
import { logger } from './logger';
import { AlertManager, Grafana } from './webhooks';

export interface GotifyMessage {
  message: string,
  priority: number,
  title: string
}

function parseAlerts(webhook: Grafana.Webhook | AlertManager.Webhook) {
  const output: string[] = [];
  for (const alert of webhook.alerts) {
    output.push(`status: ${alert.status} ${alert.annotations}\nstarted: ${alert.startsAt}\n${alert.labels}`);
  }
  return output;
}

// code responsible for sending notifications to gotify
export async function sendWebhook(webhook: Grafana.Webhook | AlertManager.Webhook, pQueue: PQueue) {
  return await pQueue.add(
    async () => {
      logger.info(webhook);

      const msg: GotifyMessage = {
        message: `${webhook.externalURL}\n${parseAlerts(webhook).join('\n')}`,
        priority: 7,
        title: `${webhook.status}: ${webhook.receiver}`
      };

      try {
        const resp = await got.post(`${process.env.GOTIFY_URL}`, {
          headers: {
            'X-Gotify-Key': process.env.GOTIFY_TOKEN
          },
          json: msg
        });
        logger.info({
          status: resp.statusCode,
          body: resp.body
        });
        return true;
      } catch (err) {
        logger.error(err);
        return false;
      }
    }
  );
}
