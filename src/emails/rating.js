import { PUBLIC_DOMAIN } from '$env/static/public' 
import { PUBLIC_EMAIL_DOMAIN } from '$env/static/public' 

const getRatingEmail = (id) => {
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
                  How was your experience?
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 30px; padding-bottom: 20px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-right: 12px;">
                        <a href="${PUBLIC_DOMAIN}/rating?id=${id}&rating=sad" style="text-decoration: none;">
                          <img src="${PUBLIC_DOMAIN}/images/sadgray.png" alt="Sad" style="width: 47px; height: 47px; border-radius: 5px; display: block;" />
                        </a>
                      </td>
                      <td style="padding-left: 12px;">
                        <a href="${PUBLIC_DOMAIN}/rating?id=${id}&rating=happy" style="text-decoration: none;">
                          <img src="${PUBLIC_DOMAIN}/images/happygray.png" alt="Happy" style="width: 47px; height: 47px; border-radius: 5px; display: block;" />
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

export { getRatingEmail }