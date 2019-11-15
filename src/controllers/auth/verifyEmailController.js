const VerifyEmailService = require("../../services/auth/verifyEmailService");

class VerifyEmailController {
	/**
	 * Attempt to verify user's email
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async verify(req, res) {
		try {
			const isVerified = await VerifyEmailService.markEmailAsVerified(
				req.query.token
			);

			if (!isVerified) {
				res.send("Email already verified.");
			} else {
				res.send("Email verification successful.");
			}
		} catch (error) {
			res
				.status(400)
				.send(
					"Email verification failed. Login and resend verification email again."
				);
		}
	}

	/**
	 * Resend email verification mail
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	resend(req, res) {
		try {
			if (req.user.verifiedAt) {
				res.send({ message: "Email already verified." });
			} else {
				VerifyEmailService.sendEmailVerification(req.user.email);
				res.send({ message: "Email sent. Check your inbox or spam." });
			}
		} catch (error) {
			res.status(500).send();
		}
	}

	/**
	 * Confirm user's email status to know if it has been verified or not
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	status(req, res) {
		try {
			if (req.user.verifiedAt) {
				res.send({
					status: "success",
					code: 200,
					title: "OK",
					message: "Email is verified.",
					data: {
						verifiedAt: req.user.verifiedAt
					}
				});
			} else {
				res.send({
					status: "success",
					code: 200,
					title: "OK",
					message: "Email has not been verified.",
					data: {
						verifiedAt: req.user.verifiedAt
					}
				});
			}
		} catch (error) {
			res.status(500).send();
		}
	}
}

module.exports = new VerifyEmailController();
