import axios from "axios";


export const userCart = async (cart,authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/user/cart/`,{cart},
   {headers :{
        authtoken ,
    },
})

export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart/`,
   {headers :{
        authtoken ,
    },
})

export const emptyUSerCart = async (authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/cart/`,{},
   {headers :{
        authtoken ,
    },
})

export const addUserAdresse = async (authtoken,adresse) =>
    await axios.post(`${process.env.REACT_APP_API}/user/adresse/`,{adresse},
   {headers :{
        authtoken ,
    },
})

export const getUserAdresse = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/adresse/`,
   {headers :{
        authtoken ,
    },
})


export const applyCoupon = async (authtoken,coupon) =>
    await axios.post(`${process.env.REACT_APP_API}/user/cartcoupon/`,{coupon},
   {headers :{
        authtoken ,
    },
})

export const createOrder = async (authtoken,stripeResponse) =>
    await axios.post(`${process.env.REACT_APP_API}/user/order/`,{stripeResponse},
   {headers :{
        authtoken ,
    },
})

export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders/`,
   {headers :{
        authtoken ,
    },
})

export const addWhishList = async (authtoken,productId) =>
    await axios.post(`${process.env.REACT_APP_API}/user/whishlist/`,{productId},
   {headers :{
        authtoken ,
    },
})

export const getWhishList = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/whishlist/`,
   {headers :{
        authtoken ,
    },
})

export const removeWhishList = async (productId,authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/whishlist/${productId}`,{},
   {headers :{
        authtoken,
    },
})

export const createcashorder = async (authtoken,couponState) =>
    await axios.post(`${process.env.REACT_APP_API}/user/cash/order`,{couponState},
   {headers :{
        authtoken ,
    },
})