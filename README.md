# zendesk-action

This action allows you to interact with the Zendesk API.

## Usage

```yaml
name: Create Ticket

on:
  push:
    branches:
      - main
jobs:
  create-ticket:
    runs-on: ubuntu-latest
    steps:
      - name: Create Zendesk Ticket
        uses: dmux/zendesk-action@v1
        with:
          api_url: ${{ secrets.ZENDESK_API_URL }}
          api_user: ${{ secrets.ZENDESK_API_USER }}
          api_token: ${{ secrets.ZENDESK_API_TOKEN }}
          ticket_title: ${{ github.event.inputs.zendesk_ticket_title }}
          ticket_description: ${{ github.event.inputs.zendesk_ticket_description }}
          recipients: ${{ github.event.inputs.zendesk_recipients }}
          cc: ${{ github.event.inputs.zendesk_cc }}
          bcc: ${{ github.event.inputs.zendesk_bcc }}
```
