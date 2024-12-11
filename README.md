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
          ticket_title: "New Ticket"
          ticket_description: "This is a new ticket"
          recipients: ""
          cc: ""
          bcc: ""
```
