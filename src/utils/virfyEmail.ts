import nodemailer from "nodemailer";
import ENV from "../config/env";
import path from "path";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: ENV.GOOGLE_EMAIL,
    clientId: ENV.GOOGLE_CLIENT_ID,
    clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    refreshToken: ENV.GOOGLE_REFRESH_TOKEN,
  },
});

export const sendMail = async (mail: string, token: any,req:any) => {
  const restUrl = `${req.protocol}://${req.headers.host}/api/user/rest-password/${token}`;
  const html = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Rest Password</title>
    <style>
      /* Some email clients support simple media queries */
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 20px !important; }
        .hero { font-size: 22px !important; }
        .btn { width: 100% !important; display: block !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#333;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 4px 18px rgba(0,0,0,0.06); overflow:hidden; width:600px;">
            <!-- Header / brand -->
            <tr>
              <td style="padding:24px 32px; text-align:center; background: linear-gradient(90deg,#0ea5a4,#2563eb); color:white;">
                <h1 style="margin:0; font-size:24px; font-weight:700;">Elmancy E-Commerce</h1>
                <p style="margin:6px 0 0; font-size:14px; opacity:0.95;"> one  step to rest your password</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h2 class="hero" style="margin:0 0 12px; font-size:20px; line-height:1.25; color:#111;">rest your password</h2>
                <p style="margin:0 0 20px; font-size:15px; color:#555;">
                  Hi there — please rest your password so you can start using your Elmancy account. Click the button below to rest your email:
                </p>

                <!-- Button -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                  <tr>
                    <td align="center">
                      <a class="btn" href="${restUrl}" target="_blank" rel="noopener"
                         style="background-color:#2563eb; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:8px; display:inline-block; font-weight:600; font-size:16px;">
                        Verify your email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 8px; font-size:13px; color:#666;">
                  If the button doesn't work, copy and paste this URL into your browser:
                </p>
                <p style="word-break:break-all; font-size:12px; color:#1a73e8; margin:6px 0 0;">
                  <a href="${restUrl}" target="_blank" rel="noopener" style="color:#1a73e8; text-decoration:underline;">${restUrl}</a>
                </p>               
                <hr style="border:none; border-top:1px solid #eef1f5; margin:22px 0;">

                <p style="font-size:13px; color:#888; margin:0;">
                  If you didn't send for rest password, you can safely ignore this email. This link will expire in 10 minutes.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px; background:#fafafa; text-align:center; font-size:12px; color:#9aa4b2;">
                <div>Elmancy E-Commerce</div>
                <div style="margin-top:6px;">&copy; ${new Date().getFullYear()} Elmancy. All rights reserved.</div>
              </td>
            </tr>
          </table>

          <!-- small disclaimer -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; margin-top:12px;">
            <tr>
              <td style="text-align:center; font-size:12px; color:#a3aab3;">
                Having trouble? Reply to this email or contact our support.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const text = `rest password`;

  await transporter.sendMail({
    from: `"Elmancy E-commerce" <${ENV.GOOGLE_EMAIL}>`,
    to: mail,
    subject: "rest password",
    // attachments:[{
    //   filename:"invoice.pdf",
    //   path:path.join(process.cwd(), "src/uploads/invoice.pdf"),
    //   contentType:"application/pdf"
    // }],
    text,
    html,
  });
};
