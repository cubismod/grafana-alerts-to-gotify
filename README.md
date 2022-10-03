# grafana-alerts-to-gotify
A Node.js Bun app that takes alerts from https://grafana.com and sends them to a Gotify instance.

## Supported Webhook Types
| Type                                                                                                   | Environment Variables | Web Endpoint    |
|--------------------------------------------------------------------------------------------------------|-----------------------|-----------------|
| [Grafana](https://grafana.com/docs/grafana/latest/alerting/contact-points/notifiers/webhook-notifier/) | `GRAFANA_TOKEN`       | `/grafana`      |
| [Alertmanager](https://prometheus.io/docs/alerting/latest/configuration/#webhook_config)               | `ALERTMANAGER_TOKEN`  | `/alertmanager` |

## Required Environment Variables
- `GOTIFY_URL`
- `GOTIFY_TOKEN`
- `MSG_PRIORITY`
  - this indicates the priority of the message sent to Gotify
