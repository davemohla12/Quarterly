import { PUBLIC_DOMAIN } from '$env/static/public' 
import { PUBLIC_EMAIL_DOMAIN } from '$env/static/public' 
import { currentTaxQuarter } from '$src/settings/settings'
import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'

const getFiveDayEmail = (id) => {
  let dueDate
  if (currentTaxQuarter == 'Q1') {
    dueDate = q1DueDate.format('MMMM D, YYYY')
  }
  else if (currentTaxQuarter == 'Q2') {
    dueDate = q2DueDate.format('MMMM D, YYYY')
  }
  else if (currentTaxQuarter == 'Q3') {  
    dueDate = q3DueDate.format('MMMM D, YYYY')
  }
  else if (currentTaxQuarter == 'Q4') {
    dueDate = q4DueDate.format('MMMM D, YYYY')
  }

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
                  Your quarterly payment is due soon
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family: Tahoma, sans-serif; font-size: 15px; color: #222; padding-top: 20px;">
                  Pay by ${dueDate} to avoid penalties.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 20px; padding-bottom: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="background-color: #44D8A8; border-radius: 5px;">
                    <tr>
                      <td style="padding: 15px 40px;">
                        <a href="${PUBLIC_DOMAIN}/dashboard" style="font-family: Tahoma, sans-serif; font-size: 16px; color: #FFFFFF; text-decoration: none; display: block; text-align: center;">
                          PAY NOW
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top: 15px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <a href="${PUBLIC_DOMAIN}/reminders?id=${id}" style="font-family: Tahoma, sans-serif; font-size: 13px; color: #B4B3B3; text-decoration: none;">
                    Manage Reminders
                  </a>
                  <span style="font-family: Tahoma, sans-serif; font-size: 13px; color: #B4B3B3; margin: 0 8px;">•</span>
                  <a href="${PUBLIC_DOMAIN}/confirmation?id=${id}&action=stop" style="font-family: Tahoma, sans-serif; font-size: 13px; color: #B4B3B3; text-decoration: none;">
                    Stop Reminders
                  </a>
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

export { getFiveDayEmail }