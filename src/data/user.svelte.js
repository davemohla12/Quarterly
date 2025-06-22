import { getLocalStorage } from '$src/utilities/utilities'
import { global } from '$src/data/global.svelte'
import { setInUsers, getFromUsers } from '$src/utilities/database'
import { setLocalStorage } from '$src/utilities/utilities'

const user = $state({
  async getValue(field) {
    if (global.loggedIn) {
      return await getFromUsers(field)
    }
    else {
      return getLocalStorage(field)
    }
  },

  async setValue(field, value) {
    if (global.loggedIn) {
      await setInUsers(field, value)
    }
    else {
      setLocalStorage(field, value)
    }
  },

  async addValue(field, value) {
      await addToUsers(field, value)
  }

})

export { user }