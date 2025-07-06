import { getLocalStorage } from '$src/utilities/utilities'
import { global } from '$src/data/global.svelte'
import { setInUsers, getFromUsers, addToUsers } from '$src/utilities/database'
import { setLocalStorage } from '$src/utilities/utilities'
import { getFromUsersById, setInUsersById } from '$src/utilities/database'

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
  },

  async getValueById(field, id) {
    return await getFromUsersById(field, id)
  },

  async setValueById(field, id, value) {
    await setInUsersById(field, id, value)
  }

})

export { user }