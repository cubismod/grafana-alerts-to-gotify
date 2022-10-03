import {Context, Router} from '@kapsonfire/bun-bakery'
import * as process from "process";
import {
    Roarr as log,
} from 'roarr';

export class Main {
    private checkEnv(key: string, val?: string) {
        if (!val) {
            log(`Environment variable ${key} not defined, required for starting the application`)
            return false
        }
        return true
    }

    start() {
        let err = false

        err = this.checkEnv('GRAFANA_TOKEN', process.env.GRAFANA_TOKEN)
        err = this.checkEnv('ALERTMANAGER_TOKEN', process.env.ALERTMANAGER_TOKEN)
        err = this.checkEnv('GOTIFY_URL', process.env.GOTIFY_URL)
        err = this.checkEnv('GOTIFY_TOKEN', process.env.GOTIFY_TOKEN)

        if (err) {
            log.error('Missing required environment variable(s), application exiting.')
            return -1
        }

        const router = new Router({
            routesPath: './routes/'
        })

        router.addMiddleware({
            onResponse: (ctx: Context) => {
                log(JSON.stringify(ctx))
            }
        })
    }
}
