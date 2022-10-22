import { JSONObject } from 'ts-json-object';

// https://grafana.com/docs/grafana/latest/alerting/contact-points/notifiers/webhook-notifier/
export namespace Grafana {
    export class Alert extends JSONObject {
        @JSONObject.required
          status: string;

        @JSONObject.required
          labels: any;

        @JSONObject.required
          annotations: any;

        @JSONObject.required
          startsAt: string;

        @JSONObject.required
          endsAt: string;

        @JSONObject.required
          valueString: string;

        @JSONObject.required
          generatorUrl: string;

        @JSONObject.required
          fingerprint: string;

        @JSONObject.required
          silenceURL: string;
    }
    export class Webhook extends JSONObject {
      @JSONObject.required
        receiver: string;

      @JSONObject.required
        status: string;

      @JSONObject.required
        orgId: number;

      @JSONObject.required
        alerts: Alert[];

      @JSONObject.required
        groupLabels: any;

      @JSONObject.required
        commonLabels: any;

      @JSONObject.required
        commonAnnotations: any;

      @JSONObject.required
        externalURL: string;

      @JSONObject.required
        version: string;

      @JSONObject.required
        groupKey: string;

      @JSONObject.required
        truncatedAlerts: number;
    }
}

// https://prometheus.io/docs/alerting/latest/configuration/#webhook_config
export namespace AlertManager {
    export class Alert extends JSONObject {
      @JSONObject.required
        status: string;

      @JSONObject.required
        labels: any;

      @JSONObject.required
        annotations: any;

      @JSONObject.required
        startsAt: string;

      @JSONObject.required
        endsAt: string;

      @JSONObject.required
        generatorURL: string;

      @JSONObject.required
        fingerprint: string;
    }
    export class Webhook extends JSONObject {
      @JSONObject.required
        version: string;

      @JSONObject.required
        groupKey: string;

      @JSONObject.required
        truncatedAlerts: number;

      @JSONObject.required
        status: string;

      @JSONObject.required
        receiver: string;

      @JSONObject.required
        groupLabels: any;

      @JSONObject.required
        commonLabels: any;

      @JSONObject.required
        commonAnnotations: any;

      @JSONObject.required
        externalURL: string;

      @JSONObject.required
        alerts: Alert[];
    }
}
