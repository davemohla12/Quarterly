import { PUBLIC_DOMAIN } from '$env/static/public' 
import { PUBLIC_EMAIL_DOMAIN } from '$env/static/public' 
import { currentQuarter } from '$src/settings/settings'
import { q1DueDate, q2DueDate, q3DueDate, q4DueDate } from '$src/settings/settings'

const getOneDayEmail = () => {
  let dueDate
  if (currentQuarter == 'Q1') {
    dueDate = q1DueDate.format('MMMM D, YYYY')
  }
  else if (currentQuarter == 'Q2') {
    dueDate = q2DueDate.format('MMMM D, YYYY')
  }
  else if (currentQuarter == 'Q3') {  
    dueDate = q3DueDate.format('MMMM D, YYYY')
  }
  else if (currentQuarter == 'Q4') {
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
                <td align="center" style="font-family: Georgia, serif; font-size: 24px; font-weight: 600; color: #4A4A4A; padding-top: 20px; padding-left: 20px; padding-right: 20px;">
                  Your quarterly payment is due
                </td>
              </tr>
              <tr>
                <td align="center" style="font-family: Tahoma, sans-serif; font-size: 15px; color: #222; padding-top: 20px;">
                  Pay by ${dueDate} to stay penalty-free.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 20px; padding-bottom: 10px;">
                  <a href="${PUBLIC_DOMAIN}/dashboard" style="font-family: Tahoma, sans-serif; font-size: 16px; background-color: #44D8A8; color: #FFFFFF; width: 200px; height: 50px; border-radius: 5px; border: none; cursor: pointer; text-decoration: none; display: inline-block; text-align: center; line-height: 50px;">
                    PAY NOW
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

export { getOneDayEmail }