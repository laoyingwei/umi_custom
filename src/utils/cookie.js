import Cookie from 'js-cookie'
const TOKEN = 'TOKEN'



export const getToken  = ()  => {
    return Cookie.get(TOKEN)
}

export const setToken = (token) => {
    return Cookie.set(TOKEN,token)
}

