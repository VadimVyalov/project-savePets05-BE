const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

const sendEmailBrevo = async (to, subject, textBody) => {
  sendSmtpEmail = {
    sender: { email: "noreply@test.com", name: "Support" },
    subject: subject,
    textContent: textBody,
    to: [
      {
        email: to,
        name: "New User",
      },
    ],
    templateId: 1,

    params: {
      link: "http://localhost:5000",
    },
  };
  const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log(result);
  return result;
};

module.exports = { sendEmailBrevo };
