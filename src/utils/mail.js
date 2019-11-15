const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

class Mail {
	constructor() {
		this.emailFromAddress =
			process.env.MAIL_FROM_ADDRESS || "hello@example.com";

		this.emailFromName = process.env.MAIL_FROM_NAME || "Example";

		if (
			process.env.MAIL_DEFAULT_METHOD === "smtp" ||
			process.env.MAIL_DEFAULT_METHOD === "api"
		) {
			this.mailDefaultMethod = process.env.MAIL_DEFAULT_METHOD;
		} else {
			this.mailDefaultMethod = "smtp";
		}
	}

	/**
	 * Handles the sending of mail. You can either choose to send
	 * mails using smtp or the Sendgrid api method which has been
	 * configured below.
	 * @param {string} recipent the receiver's of the mail
	 * @param {string} subject
	 * @param {string} body the body of the mail is sent as HTML
	 * @returns {void}
	 */
	send(recipent, subject, body) {
		if (this.mailDefaultMethod == "smtp") {
			this.sendWithSMTP(recipent, subject, body);
		} else {
			this.sendWithSendgridAPI(recipent, subject, body);
		}
	}

	/**
	 * Send mails using the Sendgrid API method. Remember to provide your
	 * SENDGRID_API_KEY in the .env file
	 * @param {string} recipent the receiver's of the mail
	 * @param {string} subject
	 * @param {string} body the body of the mail is sent as HTML
	 * @returns {void}
	 */
	sendWithSendgridAPI(recipent, subject, body) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		sgMail.send({
			to: recipent,
			from: `${this.emailFromName} <${this.emailFromAddress}>`,
			subject: subject,
			html: body
		});
	}

	/**
	 * Send mails using SMTP. Remember to provide the necessary MAIL_ variables
	 * in the .env file
	 * @param {string} recipent the receiver's of the mail
	 * @param {string} subject
	 * @param {string} body the body of the mail is sent as HTML
	 * @returns {boolean}
	 */
	sendWithSMTP(recipent, subject, body) {
		const transport = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD
			}
		});

		const mailOptions = {
			from: `${this.emailFromName} <${this.emailFromAddress}>`,
			to: recipent,
			subject: subject,
			html: body
		};

		transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log("Email not sent: ", err);
				return false;
			}

			console.log("Email sent info: ", info);
			return true;
		});
	}
}

module.exports = new Mail();
