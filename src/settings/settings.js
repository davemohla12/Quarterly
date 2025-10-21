import dayjs from 'dayjs'
import { PUBLIC_STRIPE_PRICE_ID } from '$env/static/public'

const getCurrentTaxYear = () => {
  const currentMonth = dayjs().format('MMMM')
  const currentTaxYear = dayjs().year()
  if (currentMonth == 'January' || currentMonth == 'February') {
    return Number((currentTaxYear) - 1)
    } else {
      return Number(currentTaxYear)
  }
  // return 2026
}

const getCurrentTaxQuarter = () => {
  const currentMonth = dayjs().format('MMMM')
  if (currentMonth == 'February' || currentMonth == 'March' || currentMonth == 'April') {
    return 'Q1'
  } else if (currentMonth == 'May' || currentMonth == 'June') {
    return 'Q2'
  } else if (currentMonth == 'July' || currentMonth == 'August' || currentMonth == 'September') {
    return 'Q3'
  } else if (currentMonth == 'October' || currentMonth == 'November' || currentMonth == 'December' || currentMonth == 'January') {
    return 'Q4'
  }
  // return 'Q4'
}

const currentTaxYear = getCurrentTaxYear()
const currentTaxQuarter = getCurrentTaxQuarter()
const q1DueDate = dayjs('2025-04-15')
const q2DueDate = dayjs('2025-06-15')
const q3DueDate = dayjs('2025-09-15')
const q4DueDate = dayjs('2025-01-15')
const price = 79
const priceId = PUBLIC_STRIPE_PRICE_ID
const adminPasscode = 'pyaPHHtK@g6t-gD'

const today = dayjs()

const totalScreens = 30

const showReferral = false
const referralAmount = 10

const showCheckout = true
const showComingSoon = false

export { currentTaxYear, currentTaxQuarter, q1DueDate, q2DueDate, q3DueDate, q4DueDate, price, priceId, showCheckout, showReferral, adminPasscode, showComingSoon, today, totalScreens, referralAmount }