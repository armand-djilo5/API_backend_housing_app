import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST ,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const emailService = {
    sendWelcome: async (userEmail, nameUser) => {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: "Hello!, welcome on our Housing_renting_API",
                text: `Good morning and welcome, ${nameUser}`,
                html: `

            <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<title>Welcome to Roost</title>
<!--[if mso]>
<style type="text/css">
  table { border-collapse: collapse; }
  .fallback-font { font-family: Georgia, 'Times New Roman', serif !important; }
</style>
<![endif]-->
<style>
  @media only screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .stack { display: block !important; width: 100% !important; padding: 0 !important; }
    .ticket-pad { padding-left: 20px !important; padding-right: 20px !important; }
    .hide-mobile { display: none !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#EDE6D3; font-family: Helvetica, Arial, sans-serif;">

<!-- Preheader (hidden) -->
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  Your search is live. Here's how to find your next place on Roost.
</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#EDE6D3;">
<tr>
<td align="center" style="padding: 32px 16px;">

  <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px;">

    <!-- ===== BOARDING-PASS HEADER ===== -->
    <tr>
      <td style="background-color:#182640; border-radius:16px 16px 0 0; padding: 28px 32px 0 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="font-family: Helvetica, Arial, sans-serif; font-size:11px; letter-spacing:3px; color:#C89B3C; text-transform:uppercase; padding-bottom:20px;">
              Roost &nbsp;&middot;&nbsp; Rental Search
            </td>
            <td align="right" style="font-family: Helvetica, Arial, sans-serif; font-size:11px; letter-spacing:2px; color:#8391A8; text-transform:uppercase; padding-bottom:20px;">
              Ticket No. 0148
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Ticket card -->
    <tr>
      <td style="background-color:#182640; padding: 0 20px 28px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FAF6EC; border-radius:12px;">
          <tr>
            <!-- left stub: route -->
            <td class="stack ticket-pad" width="66%" style="padding: 26px 8px 26px 28px; font-family: Georgia, 'Times New Roman', serif;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family: Helvetica, Arial, sans-serif; font-size:10px; letter-spacing:2px; color:#9A8F72; text-transform:uppercase; padding-bottom:10px;">
                    Passenger
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Georgia, 'Times New Roman', serif; font-size:26px; line-height:1.2; color:#182640; font-weight:bold; padding-bottom:16px;">
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Helvetica, Arial, sans-serif; font-size:13px; color:#182640;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="font-size:11px; letter-spacing:1.5px; color:#9A8F72; text-transform:uppercase; padding-right:10px;">From</td>
                        <td style="font-size:13px; color:#182640; font-weight:bold; padding-right:18px;">Searching</td>
                        <td style="font-size:14px; color:#C89B3C; padding-right:18px;">&#8594;</td>
                        <td style="font-size:11px; letter-spacing:1.5px; color:#9A8F72; text-transform:uppercase; padding-right:10px;">To</td>
                        <td style="font-size:13px; color:#182640; font-weight:bold;">Home</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
            <!-- perforation -->
            <td width="1" style="background-image: linear-gradient(#DCD3BE 50%, rgba(255,255,255,0) 0%); background-size: 1px 8px; background-repeat: repeat-y;">&nbsp;</td>
            <!-- right stub: status -->
            <td class="stack ticket-pad" width="34%" align="center" style="padding: 26px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="font-family: Helvetica, Arial, sans-serif; font-size:10px; letter-spacing:2px; color:#9A8F72; text-transform:uppercase; padding-bottom:8px;">
                    Status
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-family: Helvetica, Arial, sans-serif; font-size:14px; color:#1E7F4F; font-weight:bold;">
                    Confirmed
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ===== BODY ===== -->
    <tr>
      <td style="background-color:#FFFFFF; padding: 36px 32px 8px 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="font-family: Georgia, 'Times New Roman', serif; font-size:22px; line-height:1.3; color:#182640; font-weight:bold; padding-bottom:14px;">
              You're checked in. Let's find the place.
            </td>
          </tr>
          <tr>
            <td style="font-family: Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#4B5768; padding-bottom:28px;">
              Your Roost account is active. From here you can browse verified listings, message landlords directly, and hold your spot on places you like — no more waiting on a callback.
            </td>
          </tr>
        </table>

        <!-- Steps -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="36" valign="top" style="padding-bottom:22px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="28" height="28" style="background-color:#FAF6EC; border:1px solid #DCD3BE; border-radius:14px;">
                <tr><td align="center" valign="middle" style="font-family: Georgia, serif; font-size:13px; color:#182640; font-weight:bold;">1</td></tr>
              </table>
            </td>
            <td valign="top" style="padding: 0 0 22px 14px; font-family: Helvetica, Arial, sans-serif;">
              <span style="font-size:15px; color:#182640; font-weight:bold;">Set your must-haves</span><br>
              <span style="font-size:13.5px; color:#6B7688; line-height:1.5;">Budget, move-in date, and neighborhoods you're set on.</span>
            </td>
          </tr>
          <tr>
            <td width="36" valign="top" style="padding-bottom:22px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="28" height="28" style="background-color:#FAF6EC; border:1px solid #DCD3BE; border-radius:14px;">
                <tr><td align="center" valign="middle" style="font-family: Georgia, serif; font-size:13px; color:#182640; font-weight:bold;">2</td></tr>
              </table>
            </td>
            <td valign="top" style="padding: 0 0 22px 14px; font-family: Helvetica, Arial, sans-serif;">
              <span style="font-size:15px; color:#182640; font-weight:bold;">Hold your favorites</span><br>
              <span style="font-size:13.5px; color:#6B7688; line-height:1.5;">Save listings and lock a spot before someone else applies.</span>
            </td>
          </tr>
          <tr>
            <td width="36" valign="top" style="padding-bottom:8px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="28" height="28" style="background-color:#FAF6EC; border:1px solid #DCD3BE; border-radius:14px;">
                <tr><td align="center" valign="middle" style="font-family: Georgia, serif; font-size:13px; color:#182640; font-weight:bold;">3</td></tr>
              </table>
            </td>
            <td valign="top" style="padding: 0 0 8px 14px; font-family: Helvetica, Arial, sans-serif;">
              <span style="font-size:15px; color:#182640; font-weight:bold;">Book a tour, keep the receipts</span><br>
              <span style="font-size:13.5px; color:#6B7688; line-height:1.5;">Message the landlord and schedule a walkthrough in-app.</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="background-color:#FFFFFF; padding: 12px 32px 36px 32px;" align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td align="center" bgcolor="#C89B3C" style="border-radius:8px;">
              <a href="https://example.com" target="_blank" style="display:block; padding:15px 0; font-family: Helvetica, Arial, sans-serif; font-size:15px; font-weight:bold; color:#182640; text-decoration:none;">
                Browse listings near you
              </a>
            </td>
          </tr>
        </table>
        <p style="margin: 14px 0 0 0; font-family: Helvetica, Arial, sans-serif; font-size:12px; color:#9AA3B0;">Takes about two minutes to set up.</p>
      </td>
    </tr>

    <!-- Divider + support line -->
    <tr>
      <td style="background-color:#FFFFFF; padding: 0 32px 32px 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td style="border-top:1px solid #EEE9DC; font-size:1px; line-height:1px;">&nbsp;</td></tr>
        </table>
        <p style="margin: 20px 0 0 0; font-family: Helvetica, Arial, sans-serif; font-size:13px; line-height:1.6; color:#6B7688; text-align:center;">
          Questions before you start looking? Reply to this email — a real person on our team reads every message.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#FAF6EC; border-radius:0 0 16px 16px; padding: 24px 32px; text-align:center;">
        <p style="margin:0 0 8px 0; font-family: Helvetica, Arial, sans-serif; font-size:11px; letter-spacing:0.5px; color:#9A8F72;">
          Roost, Inc. &middot; 48 Ridgeline Ave, Austin, TX 78701
        </p>
        <p style="margin:0; font-family: Helvetica, Arial, sans-serif; font-size:11px; color:#9A8F72;">
          <a href="https://example.com" style="color:#182640; text-decoration:underline;">Unsubscribe</a>
          &nbsp;&middot;&nbsp;
          <a href="https://example.com" style="color:#182640; text-decoration:underline;">Notification settings</a>
        </p>
      </td>
    </tr>

  </table>

</td>
</tr>
</table>

</body>
</html>
            `
            }

            const info = await transporter.sendMail(mailOptions)
            console.log(`Message sent to ${userEmail}`)
            return info
        } catch (error) {
            console.error('Email send failed:', error)
            throw error
        }
    }
}