let token = null

const STORAGE_KEY = "logged"

const setUser = (user)=>{
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    token = user.token
}

const getUser = ()=>{
    const loggedUser = window.localStorage.getItem(STORAGE_KEY)
    if(loggedUser){
        const user = JSON.parse(loggedUser)
        token = user.token
        return user
    }
    return null
}

const getUsername = ()=>{
    const loggedUser = window.localStorage.getItem(STORAGE_KEY)
    if(loggedUser){
        const user = JSON.parse(loggedUser)
        token = user.token
        return user.username
    }
}

const clearUser = ()=>{
    localStorage.clear()
    token = null
}
const getToken = ()=> token

export default {
    setUser,
    getUser,
    getUsername,
    getToken,
    clearUser
}

