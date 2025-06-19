import dayjs from 'dayjs'

const getCurrentYear = () => {
  const currentMonth = dayjs().format('MMMM')
  const currentYear = dayjs().year()
  if (currentMonth == 'January' || currentMonth == 'February') {
    return currentYear - 1
    } else {
      return currentYear
  }
}

const getCurrentQuarter = () => {
  const currentMonth = dayjs().format('MMMM')
  if (currentMonth == 'February' || currentMonth == 'March' || currentMonth == 'April') {
    return 'Q1'
  } else if (currentMonth == 'May' || currentMonth == 'June') {
    return 'Q2'
  } else if (currentMonth == 'August' || currentMonth == 'September' || currentMonth == 'October' || currentMonth == 'November') {
    return 'Q3'
  } else {
    return 'Q4'
  }
}

const currentYear = getCurrentYear()
const currentQuarter = getCurrentQuarter()
const q1DueDate = dayjs('2025-04-15')
const q2DueDate = dayjs('2025-06-15')
const q3DueDate = dayjs('2025-09-15')
const q4DueDate = dayjs('2025-01-15')

export { currentYear, currentQuarter, q1DueDate, q2DueDate, q3DueDate, q4DueDate }