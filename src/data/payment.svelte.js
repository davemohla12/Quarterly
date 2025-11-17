import { global } from '$src/data/global.svelte'
import { getLocalStorage } from '$src/utilities/utilities'
import { getFromPayments, getFromPaymentsByYear, setInPayments, setInPaymentsByYear } from '$src/utilities/database'
import { setLocalStorage } from '$src/utilities/utilities'

const payment = $state({
  async getValue(field) {
    if (global.loggedIn) {
      return await getFromPayments(field)
    }
    else {
      return getLocalStorage(field)
    }
  },

  async setValue(field, value) {
    if (global.loggedIn) {
      setLocalStorage(field, value)
      await setInPayments(field, value)
    }
    else {
      setLocalStorage(field, value)
    }
  },

  async getValueByYear(field, year) {
    return await getFromPaymentsByYear(field, year)
  },

  async setValueByYear(year, field, value) {
    await setInPaymentsByYear(year, field, value)
  }
})

export { payment }