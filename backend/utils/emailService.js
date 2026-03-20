const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const buildEmailTemplate = ({
  recipientName,
  title,
  subtitle,
  bodyMessage,
  footerNote,
  logoSrc,
  emoji
}) => {
  const safeName = recipientName || "";
  const displayEmoji = emoji || "✅";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;background: linear-gradient(135deg, #f3f7ff 0%, #ffffff 60%, #eef2ff 100%);">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="min-width:100%;background: transparent;">
      <tr>
        <td align="center" style="padding: 24px 16px;">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:100%;max-width:520px;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
            <tr>
              <td style="background: linear-gradient(135deg, #0b132b 0%, #1f2a57 100%);padding:32px 26px;text-align:center;color:#ffffff;">
                <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
                  <div style="background:#ffffff;padding:15px;border-radius:20px;box-shadow:0 4px 15px rgba(255,255,255,0.1);">
                    <img src="${logoSrc}" alt="MIC Logo" style="height:70px;width:auto;display:block;" />
                  </div>
                  <div style="text-align:center;">
                    <h1 style="margin:0;font-size:24px;letter-spacing:0.04em;font-weight:700;">MIC INTELLICA - PORTAL</h1>
                    <p style="margin:6px 0 0;font-size:14px;opacity:0.8;">DVR & DR.HS MIC COLLEGE OF TECHNOLOGY</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 34px 34px 18px;">
                <div style="width:62px;height:62px;margin:0 auto;border-radius:50%;background:linear-gradient(135deg,rgba(0,171,255,0.25),rgba(92,70,255,0.15));display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:28px;">${displayEmoji}</span>
                </div>
                <h2 style="margin:24px 0 10px;font-size:22px;color:#0d0f19;text-align:center;">${title}</h2>
                <p style="margin:0 0 18px;color:#4b5563;text-align:center;font-size:15px;line-height:1.5;">Hi ${safeName}, ${subtitle}</p>
                <div style="background:#f7f9ff;border:1px solid rgba(15,23,42,0.08);border-radius:16px;padding:18px 18px 16px;">
                  <p style="margin:0;color:#102a43;font-size:15px;line-height:1.6;">${bodyMessage}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 22px 34px 34px;">
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;text-align:center;">${footerNote || "This is an automated message from MIC INTELLICA - PORTAL. Please do not reply to this email."}</p>
                <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;line-height:1.5;text-align:center;">DVR & DR.HS MIC COLLEGE OF TECHNOLOGY</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

const sendTemplateEmail = async ({ email, subject, recipientName, title, subtitle, bodyMessage, footerNote, emoji }) => {
  const attachments = [];
  const logoPath = process.env.EMAIL_LOGO_PATH;

  // If a logo path is provided via env, attach it so it can be embedded as a CID image
  if (logoPath && fs.existsSync(logoPath)) {
    attachments.push({
      filename: path.basename(logoPath),
      path: logoPath,
      cid: 'mic-logo'
    });
  }

  const useCidLogo = attachments.length > 0;
  const logoSrc = useCidLogo
    ? "cid:mic-logo"
    : process.env.EMAIL_LOGO_URL || "https://via.placeholder.com/120x60?text=MIC+Logo";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: buildEmailTemplate({ recipientName, title, subtitle, bodyMessage, footerNote, logoSrc, emoji }),
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`${subject} sent to`, email);
  } catch (error) {
    console.error(`Error sending '${subject}' email:`, error);
    throw error;
  }
};

const sendRegistrationEmail = async (email, name) => {
  const subject = "Your MIC INTELLICA - PORTAL account is registered";
  const title = "You're Account Registered Successfully";
  const subtitle = "thank you for registering with the MIC INTELLICA - PORTAL. Your account is currently under review.";
  const bodyMessage = "An administrator will review your details and approve your account shortly. You'll receive an email notification once your account is activated.";

  await sendTemplateEmail({
    email,
    subject,
    recipientName: name,
    title,
    subtitle,
    bodyMessage,
    emoji: "⏳"
  });
};

const sendApprovalEmail = async (email, name) => {
  const subject = "Your MIC INTELLICA - PORTAL account is approved";
  const title = "You're Account is Approved";
  const subtitle = "your account has been approved and is now active.";
  const bodyMessage = "You can now log in to the MIC INTELLICA - PORTAL using your registered email. If you have any questions, contact your alumni coordinator.";

  await sendTemplateEmail({
    email,
    subject,
    recipientName: name,
    title,
    subtitle,
    bodyMessage,
    emoji: "✅"
  });
};

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Login',
    text: `Hello,

Your OTP for login is: ${otp}. It expires in 10 minutes.

Have a great day!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

module.exports = { sendOTP, sendRegistrationEmail, sendApprovalEmail };