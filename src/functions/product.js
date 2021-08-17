import axios from 'axios'
export const createProduct = async (product,authtoken) => 
await axios.post(`${process.env.REACT_APP_API}/Product`,product,{
    headers : {
        authtoken,
    },
});



     
export const getProductsByCount = async (count) => 
await axios.get(`${process.env.REACT_APP_API}/Products/${count}`);


export const removeProduct = async (slug,authtoken) => 
await axios.delete(`${process.env.REACT_APP_API}/Product/${slug}`,{
    headers : {
        authtoken,
    },
});



export const getProduct= async (slug) => 
await axios.get(`${process.env.REACT_APP_API}/Product/${slug}`);


export const updateproduct = async (slug,product,authtoken) => 
await axios.put(`${process.env.REACT_APP_API}/Product/${slug}`,product,{
    headers : {
        authtoken,
    },
});

export const getProducts = async (sort,order,page) => 
await axios.post(`${process.env.REACT_APP_API}/Products`,{sort,order,page});

export const getproductsCount = async () => 
await axios.get(`${process.env.REACT_APP_API}/Products/count`);

export const productstart = async (productId,star,authtoken) => 
await axios.put(`${process.env.REACT_APP_API}/${productId}`,{star},{
    headers : {
        authtoken,
    },
});


export const getRelated= async (productId) => 
await axios.get(`${process.env.REACT_APP_API}/Product/related/${productId}`);



export const getproductsbyfilter= async (arg) => 
await axios.post(`${process.env.REACT_APP_API}/search/filters`,arg);