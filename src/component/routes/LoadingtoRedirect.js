import { useEffect,useState } from "react"
import { useHistory } from "react-router-dom"


const LoadingtoRedirect = () => {

    const [count , setcount] = useState(5)
    let history = useHistory()
    useEffect(()=>{

        const interval = setInterval(()=>{
            setcount((currentCount)=>--currentCount);

        },1000)

        count === 0 && history.push('/Login');

        return() => clearInterval(interval);

    },[count,history]);

    return (
        <div className="container p-5 text-center"> <h2>You are Not Loged in You Will Be Reddirected in {count} To The Login Page</h2>  </div>
    )

}
export default LoadingtoRedirect;