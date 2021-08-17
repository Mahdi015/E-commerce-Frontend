import axios from 'axios'

export const getsubs = async () => 
     await axios.get(`${process.env.REACT_APP_API}/subs`);


     
export const getsub = async (slug) => 
await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removesub = async (slug,authtoken) => 
await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
    headers : {
        authtoken,
    },
});


export const updatesub = async (slug,sub,authtoken) => 
await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,sub,{
    headers : {
        authtoken,
    },
});

export const createsub = async (sub,authtoken) => 
await axios.post(`${process.env.REACT_APP_API}/sub`,sub,{
    headers : {
        authtoken,
    },
});