import nodemailer from "nodemailer";

export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
  const user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD || process.env.EMAIL_SERVER_PASS;
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || "587", 10);
  const from = process.env.EMAIL_FROM || "Velora Atelier <no-reply@velora.luxury>";

  const luxuryHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FCF7EE; margin: 0; padding: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 24px; border: 1px solid #E8DFD1; overflow: hidden; }
          .header { background: #1A1714; padding: 36px 30px; text-align: center; }
          .brand { font-family: 'Georgia', serif; font-size: 28px; letter-spacing: 4px; color: #E8DFD1; font-weight: bold; text-transform: uppercase; margin: 0; }
          .tagline { color: #D4A373; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }
          .body { padding: 36px 32px; color: #2B2B2B; line-height: 1.6; }
          .title { font-size: 20px; font-weight: bold; color: #1A1714; margin-bottom: 12px; }
          .text { font-size: 14px; color: #6F6A63; margin-bottom: 24px; }
          .btn-container { text-align: center; margin: 32px 0; }
          .btn { display: inline-block; background-color: #7A6A53; color: #ffffff !important; font-size: 13px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 16px; letter-spacing: 1px; }
          .notice { font-size: 12px; color: #A39B8F; border-top: 1px solid #F5EFE4; padding-top: 20px; margin-top: 28px; }
          .footer { background: #FAF6EF; padding: 20px; text-align: center; font-size: 11px; color: #A39B8F; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand">VELORA</h1>
            <p class="tagline">Boutique & Atelier Operations</p>
          </div>
          <div class="body">
            <h2 class="title">Password Reset Request</h2>
            <p class="text">Hello ${name || "Client"},</p>
            <p class="text">We received a request to securely reset your password for your Velora account. Click the link below to choose a new password.</p>
            
            <div class="btn-container">
              <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
            </div>

            <p class="text" style="font-size: 12px; word-break: break-all;">
              Or copy this URL into your browser:<br>
              <a href="${resetUrl}" style="color: #7A6A53;">${resetUrl}</a>
            </p>

            <div class="notice">
              This password reset link will expire in 1 hour. If you did not request this change, you can safely disregard this message.
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Velora Atelier Inc. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from,
        to,
        subject: "Reset Your Velora Account Password",
        text: `Reset your Velora password here: ${resetUrl}`,
        html: luxuryHtml,
      });

      console.log(`[Velora Mail] Password reset email sent successfully to ${to}`);
      return { success: true };
    } catch (err) {
      console.error("[Velora Mail] Failed to send email via SMTP:", err);
      // fallback logging so user flow doesn't break
      console.log(`[Velora Mail Fallback] Reset URL for ${to}: ${resetUrl}`);
      return { success: false, error: err.message };
    }
  } else {
    // Development / unconfigured SMTP fallback
    console.log(`\n========================================`);
    console.log(`[VELORA PASSWORD RESET EMAIL]`);
    console.log(`To: ${to}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(`========================================\n`);
    return { success: true, simulated: true };
  }
}
