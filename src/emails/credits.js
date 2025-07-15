import { PUBLIC_DOMAIN } from '$env/static/public' 
import { PUBLIC_EMAIL_DOMAIN } from '$env/static/public' 

const getCreditsEmail = (credits) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
    </head>
    <body style="background-color: #F7F7F7; margin-top: 0; padding-top: 10px; padding-bottom: 100px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table width="400" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; padding: 20px; border-radius: 5px; border: 1px solid #EFEFEF;">
              <tr>
                <td align="center" style="padding-top: 20px; padding-bottom: 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="height: 32px; text-align: center;">
                        <img src="${PUBLIC_EMAIL_DOMAIN}/images/avatar.png" alt="Avatar" style="width: 64px; height: 64px; border-radius: 50%; display: inline-block; margin: -16px auto 0 auto;" />
                      </td>
                    </tr>
                  </table>
                  <img src="${PUBLIC_EMAIL_DOMAIN}/images/logo.png" alt="Zenguider Logo" style="width: 105px; height: 26px; display: block; margin: 16px auto 0 auto;" />
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family: Georgia, serif; font-size: 24px; font-weight: 600; color: #4A4A4A; padding-top: 20px;">
                  You earned $${credits} in credits
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family: Tahoma, sans-serif; font-size: 15px; color: #222; padding-top: 20px;">
                  Keep sharing with more users to earn more credits
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 15px; padding-bottom: 15px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="background-color: #44D8A8; border-radius: 5px;">
                    <tr>
                      <td style="padding: 15px 25px;">
                        <a href="${PUBLIC_DOMAIN}/refer" style="font-family: Tahoma, sans-serif; font-size: 16px; color: #FFFFFF; text-decoration: none; display: block; text-align: center;">
                          VIEW YOUR CREDITS
                        </a>
                      </td>
                    </tr>
                  </table>
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

export { getCreditsEmail }