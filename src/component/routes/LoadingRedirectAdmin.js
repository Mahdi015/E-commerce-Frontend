import { useEffect,useState } from "react"
import { useHistory } from "react-router-dom"


const LoadingtoRedirectadmin = () => {

    const [count , setcount] = useState(5)
    let history = useHistory()
    useEffect(()=>{

        const interval = setInterval(()=>{
            setcount((currentCount)=>--currentCount);

        },1000)

        count === 0 && history.push('/');

        return() => clearInterval(interval);

    },[count,history]);

    return (
        <div className="container p-5 text-center"> <h2>Acces Denied You Will Be Reddirected in {count} </h2>  </div>
    )

}
export default LoadingtoRedirectadmin;