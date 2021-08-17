import axios from 'axios'

export const getCategories = async () => 
     await axios.get(`${process.env.REACT_APP_API}/Categories`);


     
export const getCategorie = async (slug) => 
await axios.get(`${process.env.REACT_APP_API}/Category/${slug}`);

export const removeCategory = async (slug,authtoken) => 
await axios.delete(`${process.env.REACT_APP_API}/Category/${slug}`,{
    headers : {
        authtoken,
    },
});


export const updateCategory = async (slug,category,authtoken) => 
await axios.put(`${process.env.REACT_APP_API}/Category/${slug}`,category,{
    headers : {
        authtoken,
    },
});

export const createCategory = async (category,authtoken) => 
await axios.post(`${process.env.REACT_APP_API}/Category`,category,{
    headers : {
        authtoken,
    },
});


     
export const getCategorySubs = async (_id) => 
await axios.get(`${process.env.REACT_APP_API}/Category/subs/${_id}`);