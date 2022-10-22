
import { dirname, importx } from '@discordx/importer';
import { Koa } from '@discordx/koa';
import { logger } from './logger';

export class Main {
  private server = new Koa();
  private checkEnv(key: string, val?: string) {
    if (!val) {
      logger.error(`Environment variable ${key} not defined, required for starting the application`);
      return false;
    }
    return true;
  }

  async start() {
    let err: boolean | undefined = false;

    err = this.checkEnv('GRAFANA_TOKEN', process.env.GRAFANA_TOKEN);
    err = this.checkEnv('ALERTMANAGER_TOKEN', process.env.ALERTMANAGER_TOKEN);
    err = this.checkEnv('GOTIFY_URL', process.env.GOTIFY_URL);
    err = this.checkEnv('GOTIFY_TOKEN', process.env.GOTIFY_TOKEN);
    err = this.checkEnv('AUTH', process.env.AUTH);

    if (!err) {
      console.error('Missing required environment variable(s), application exiting.');
      return -1;
    }

    const port = 45045;

    const filename = dirname(import.meta.url) + '/router.js';
    logger.info(filename);
    await importx(filename);

    await this.server.build();

    this.server.listen(port, () => {
      logger.info('Available at http://localhost:45045');
    });
  }
}

const main = new Main();
await main.start();
