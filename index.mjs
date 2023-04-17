import nodemailer from 'nodemailer';

export const handler = async (event) => {
	const { userEmail,subject, text } = JSON.parse(event.Records[0].body);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'cg043052@gmail.com',
			pass: 'jssdigevpskyrvab',
		},
	});

	// send email using nodemailer
	const mailOptions = {
		from: 'cg043052@gmail.com',
		to: userEmail,
		subject: subject,
		text: text,
	};
	try {
		await transporter.sendMail(mailOptions);
		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Email sent successfully' }),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Failed to send email' }),
		};
	}
};