export namespace Grafana {
    export interface Alert {
        status: string,
        startsAt: string,
        endsAt: string,
        valueString: string,
        generatorUrl: string,
        fingerprint: string,
        silenceURL: string
    }
    export interface Webhook {
        reciever: string,
        status: string,
        orgId: number,
        alerts: Alert[],
        externalURL: string,
        version: string,
        groupKey: string,
        truncatedAlerts: number
    }
}

export namespace AlertManager {
    export interface Alert {
        status: string,
        startsAt: string,
        endsAt: string,
        generatorURL: string,
        fingerprint: string
    }
    export interface Webhook {
        version: string,
        groupKey: string,
        truncatedAlerts: number
        status: string,
        receiver: string,
        externalURL: string,
        alerts: Alert[]
    }
}
