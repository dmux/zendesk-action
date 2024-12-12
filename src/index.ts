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
      recipients:
        recipients.split(",").map((email) => ({ user_email: email.trim() })) ||
        [],
      cc: cc
        ? cc.split(",").map((email) => ({ user_email: email.trim() }))
        : [],
      bcc: bcc
        ? bcc.split(",").map((email) => ({ user_email: email.trim() }))
        : [],
    };

    const containsHtmlTags = /<\/?[a-z][\s\S]*>/i.test(ticketData.description);

    const data = {
      ticket: {
        requester: {
          name: requesterName,
          email: requesterEmail,
        },
        email_ccs: ticketData.recipients,
        comment: containsHtmlTags
          ? {
              html_body: ticketData.description, // Use html_body if description contains HTML tags
            }
          : {
              body: ticketData.description, // Use body if description does not contain HTML tags
            },
        priority: "normal",
        subject: ticketData.title,
      },
    };

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
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
    }
    core.setFailed(`Failed to create ticket: ${(error as Error).message}`);
  }
}

run();
