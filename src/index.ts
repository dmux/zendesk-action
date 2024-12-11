import * as core from "@actions/core";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    const apiUrl = core.getInput("zendesk_api_url", { required: true });
    const apiToken = core.getInput("zendesk_api_token", { required: true });
    const ticketTitle = core.getInput("zendesk_ticket_title", {
      required: true,
    });
    const ticketDescription = core.getInput("zendesk_ticket_description", {
      required: false,
    });
    const recipients = core.getInput("zendesk_recipients", { required: true });
    const cc = core.getInput("zendesk_cc", { required: false });
    const bcc = core.getInput("zendesk_bcc", { required: false });
    const ticketData = {
      title: ticketTitle,
      description: ticketDescription || "No description provided.",
      recipients: recipients.split(","),
      cc: cc ? cc.split(",") : [],
      bcc: bcc ? cc.split(",") : [],
    };
    const response = await axios.post(apiUrl, ticketData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });
    core.setOutput("ticket_id", response.data.id);
    console.log(`Ticket created successfully: ${response.data.id}`);
  } catch (error) {
    core.setFailed(`Failed to create ticket: ${(error as Error).message}`);
  }
}

run();
