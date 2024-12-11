import * as core from "@actions/core";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    const apiUrl = core.getInput("zendesk_api_url", { required: true });
    const apiUser = core.getInput("zendesk_api_user", { required: true });
    const apiToken = core.getInput("zendesk_api_token", { required: true });
    const ticketTitle = core.getInput("zendesk_ticket_title", {
      required: true,
    });
    const ticketDescription = core.getInput("zendesk_ticket_description", {
      required: false,
    });
    const requesterName = core.getInput("zendesk_requester_name", {
      required: true,
    });
    const requesterEmail = core.getInput("zendesk_requester_email", {
      required: true,
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

    console.log("Zendesk API URL:", apiUrl);
    console.log("Zendesk API User:", apiUser);

    console.log("Creating ticket with the following data:");
    console.log(ticketData);

    const data = JSON.stringify({
      ticket: {
        requester: {
          name: requesterName,
          email: requesterEmail,
        },
        ...(ticketData.cc.length > 0 && {
          email_ccs: ticketData.recipients.map((recipient: any) => ({
            user_email: recipient,
          })),
        }),
        comment: {
          body: ticketData.description,
        },
        priority: "urgent",
        subject: ticketData.title,
      },
    });

    console.log("Ticket data:");
    console.log(data);

    console.log("Sending request to Zendesk API...");

    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${apiUser}/token:${apiToken}`
        ).toString("base64")}`,
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
