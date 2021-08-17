import axios from 'axios'

export const creatOrUpdateUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/CreatOrUpdate`,
        {},{
        headers: {
            authtoken,
        }
    })
}



export const curruser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/CurrentUSer`,
        {},{
        headers: {
            authtoken,
        }
    })
}


export const curradmin = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/Currentadmin`,
        {},{
        headers: {
            authtoken,
        }
    })
}
