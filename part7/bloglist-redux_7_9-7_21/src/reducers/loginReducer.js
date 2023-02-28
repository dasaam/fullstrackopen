import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'


const loginSlice = createSlice({
    name: 'login',
    initialState:[],
    reducers: {

      setUser(state, action) {
        return action.payload
      },
      setLogout(state, action) {
        console.log(action)
        return action.payload
      },
      setLogin(state, action) {
        console.log(action)
        return action.payload
      },
    },
})

export const { setUser, setLogout, setLogin } = loginSlice.actions

export const initializeLogin = () => {
    return async dispatch => {
        const user = storageService.loadUser()
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async dispatch => {
        storageService.removeUser()
        dispatch(setLogout(''))
    }
}

export const login = (content) => {
    return async dispatch => {

        const user = await loginService.login(content)
        storageService.saveUser(user)
        dispatch(setLogin(user))

    }
}


export default loginSlice.reducer