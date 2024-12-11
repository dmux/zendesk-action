# zendesk-action

This action allows you to interact with the Zendesk API.

## Usage

```yaml
name: Create Ticket

on:
  workflow_dispatch:
    inputs:
      zendesk_ticket_title:
        description: "Ticket title"
        required: true
      zendesk_ticket_description:
        description: "Ticket description"
        required: false
      zendesk_recipients:
        description: "List of recipients (comma-separated)"
        required: true
      zendesk_cc:
        description: "List of CC emails (comma-separated)"
        required: false
      zendesk_bcc:
        description: "List of BCC emails (comma-separated)"
        required: false
jobs:
  create-ticket:
    runs-on: ubuntu-latest
    steps:
      - name: Create Zendesk Ticket
        uses: dmux/zendesk-action@v1
        with:
          api_url: ${{ secrets.ZENDESK_API_URL }}
          api_token: ${{ secrets.ZENDESK_API_TOKEN }}
          ticket_title: ${{ github.event.inputs.zendesk_ticket_title }}
          ticket_description: ${{ github.event.inputs.zendesk_ticket_description }}
          recipients: ${{ github.event.inputs.zendesk_recipients }}
          cc: ${{ github.event.inputs.zendesk_cc }}
          bcc: ${{ github.event.inputs.zendesk_bcc }}
```
