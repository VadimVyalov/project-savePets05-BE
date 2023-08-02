const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { BREVO_API_KEY } =  process.env;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =BREVO_API_KEY
 ;

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
