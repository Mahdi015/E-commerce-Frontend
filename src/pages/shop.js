import React , {useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {getProductsByCount, getproductsbyfilter} from '../functions/product'
import Productcard from '../component/carts/productcard'
import {Menu , Slider , Checkbox , Radio} from 'antd'
import { DollarOutlined , DownSquareOutlined , StarOutlined} from '@ant-design/icons'
import {getCategories} from '../functions/categories'
import Star from '../component/forms/star'
import {getsubs} from '../functions/sub'




const {SubMenu , ItemGroup} = Menu;

const Shop = () =>{
    const [products,setproducts] = useState([])
    const [loading,setloading] = useState(false)
    const [price,setprice] = useState([0,0])
    const [ok,setok] = useState(false)
    const [chekedcategories,setchekedcategories] = useState([])
    const[categories,setcategories] = useState([])
    const [subs,setsubs] = useState([])
    const [sub,setsub] = useState([])
    const[star,setstar] = useState('')
    const [brands,setbrands] = useState(['Cats','Dogs','Birds','Hamster','Monkey'])
    const [brand,setbrand] = useState([])
    const[colors,setcolors] = useState(['Black','Brown','Silver','White','Blue'])
    const [color,setcolor] = useState([])
    const [shipping,setshipping] = useState([])
    let dispatch = useDispatch()
    let {search} = useSelector((state)=>({...state}))
    const {text} = search
 
    useEffect(()=>{
        loadProduct()
        //Load Categories
        getCategories().then((res)=>setcategories(res.data))
        //Load Subs
        getsubs().then((res)=>setsubs(res.data))
    },[])
    const fetchproduct = (arg) =>{
        getproductsbyfilter(arg).then((res)=>setproducts(res.data))
    }
    
// Load Products By Deafault
    const loadProduct = () =>{
        getProductsByCount(10).then((res=>{
            setproducts(res.data)
            setloading(false)
        }))
    }

// Load By Search
    useEffect(()=>{
        //Reset 
        setcolor([])
        setbrand([])
        setsub('')
        setprice([0,0])
        setstar('')
        setchekedcategories([])
        setshipping([])

        if (text === ''){
            loadProduct()
        }
        const delayed = setTimeout(()=>{
            fetchproduct({query : text})
        },300)
        return() => clearTimeout(delayed)
    },[text])

 
// Load Product Based On Price
    useEffect(()=>{
        fetchproduct({price})
    },[ok])



    const handleSlider = (value) =>{
        //Reset 
        setcolor([])
        setbrand([])
        setsub('')
        setprice(value)
        setstar('')
        setchekedcategories([])
        setshipping([])
        setTimeout(() => {
            setok(!ok)
        }, 300);
    }

    
// Load Product Based on Categories

const showcategories = () =>
    categories.map((c)=> (<div key={c._id}>

        <Checkbox onChange={handleChange} className='pb-2 pl-4 pr-4' value={c._id} checked={chekedcategories.includes(c._id)} name='Category'>{c.name} </Checkbox>
        <br/>
    </div>))

const handleChange = (e) =>{
    //Reset
    setcolor([])
    setbrand([])
    setsub('')
    setprice([0,0])
    setstar('')
    setshipping([])
    let inTheState = [...chekedcategories]
    let checkedCat = e.target.value
    let foundOnState = inTheState.indexOf(checkedCat)

    if (foundOnState === -1){
        inTheState.push(checkedCat)

    }else{
        inTheState.splice(foundOnState,1)
    }
    setchekedcategories(inTheState)
    console.log(inTheState)
    console.log(chekedcategories)
    fetchproduct({category : inTheState})

    if (inTheState == ''){
        loadProduct()
    }
}

//Load Product Based On Ratings
const handleStarClick = (num) =>{
    //Reset
    setcolor([])
    setbrand([])
    setsub('')
    setprice([0,0])
    setchekedcategories([])
    setshipping([])
    setstar(num)
    fetchproduct({stars : num})
}

const showStars = () =>(
    <div className='pr-4 pl-4 pb-2'>
        <Star
            starClick={handleStarClick}
            numberOfStar={5}
        />
        <Star
            starClick={handleStarClick}
            numberOfStar={4}
        />
        <Star
            starClick={handleStarClick}
            numberOfStar={3}
        />
        <Star
            starClick={handleStarClick}
            numberOfStar={2}
        />
        <Star
            starClick={handleStarClick}
            numberOfStar={1}
        />

    </div>
)

//Load Product Based On Sub-categories

const showsubs = () => subs.map((s)=><div onClick={()=>handleSubmit(s)} style={{cursor:'pointer'}} key={s._id} className='p-1 m-1 badge badge-secondary'>{s.name}</div>)


const handleSubmit = (s) =>{
    //Reset
    setcolor([])
    setbrand([])
    setprice([0,0])
    setchekedcategories([])
    setstar('')
    setshipping([])
    setsub(s)
    fetchproduct({sub : s})
}

//Load Product Based On Brands

const showbrands = () => brands.map((b)=><Radio key={b} value={b} name={b} checked={b === brand}
 onChange={handleBrands} className='pb-1 pl-4 pr-4'>{b}</Radio>)

const handleBrands = (e) =>{
        //Reset
        setcolor([])
        setsub('')
        setprice([0,0])
        setchekedcategories([])
        setstar('')
        setshipping([])
        setbrand(e.target.value)
        fetchproduct({brand : e.target.value})

}

//Load Product Based On Colors

const showcolors =() => colors.map((c)=><Radio key={c} value={c} name={c} checked={c === color}
onChange={handleColors} className='pb-1 pl-4 pr-4'>{c}</Radio>)

const handleColors = (e) =>{
    //Reset
    setsub('')
    setprice([0,0])
    setchekedcategories([])
    setstar('')
    setbrand([])
    setshipping([])
    setcolor(e.target.value)
    fetchproduct({color : e.target.value})

}

const showshipping = () => (
    <>
    <Checkbox 
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingchange}
        value='Yes'
        checked={shipping === 'Yes'}
    > Yes </Checkbox>
       <Checkbox 
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingchange}
        value='No'
        checked={shipping === 'No'}
    > No </Checkbox>
    </>
)
const handleShippingchange = (e) =>{
    //Reset
    setsub('')
    setprice([0,0])
    setchekedcategories([])
    setstar('')
    setbrand([])
    setcolor([])
    setshipping(e.target.value)
    fetchproduct({shipping : e.target.value})
}

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 pt-2'>
                    <h4>Search/Filters</h4>
                    <hr/>
                    <Menu defaultOpenKeys={['1','2','3','4','5','6','7']} mode='inline'>
                        <SubMenu key='1' title={
                        <span className='h6' >
                        <DollarOutlined/>    Price 
                        </span>}>
                            <div>
                                <Slider className='ml-4 mr-4' tipFormatter={(v)=>`$${v}`} range   value={price}
                                 onChange={handleSlider}
                                 max='4999'
                                  />

                                
                            </div>
                        </SubMenu>
                        <SubMenu key='2' title={
                        <span className='h6'>
                        <DownSquareOutlined/>   Categories
                        </span>}>
                            <div style={{ marginTop: '-5px'}}>
                                
                            {showcategories()}
                                
                            </div>
                        </SubMenu>

                        <SubMenu key='3' title={
                        <span className='h6'>
                        <StarOutlined className='h6'  />   Rating
                        </span>}>
                            <div style={{ marginTop: '-5px'}}>
                                
                            {showStars()}
                                
                            </div>
                        </SubMenu>
                        <SubMenu key='4' title={
                        <span className='h6'>
                        <DownSquareOutlined/>   Sub-Categories
                        </span>}>
                            <div style={{ marginTop: '-10px'}} className='pl-4 pr-4'>
                                
                            {showsubs()}
                                
                            </div>
                        </SubMenu>
                        <SubMenu key='5' title={
                        <span className='h6'>
                        <DownSquareOutlined/>   Brands
                        </span>}>
                            <div style={{ marginTop: '-5px'}} className= 'pr-5'>
                                
                            {showbrands()}
                                
                            </div>
                        </SubMenu>
                        <SubMenu key='6' title={
                        <span className='h6'>
                        <DownSquareOutlined/>   Colors
                        </span>}>
                            <div style={{ marginTop: '-5px'}} className= 'pr-5'>
                                
                            {showcolors()}
                                
                            </div>
                        </SubMenu>
                        <SubMenu key='7' title={
                        <span className='h6'>
                        <DownSquareOutlined/>   Shipping
                        </span>}>
                            <div style={{ marginTop: '-5px'}} className= 'pr-5'>
                                
                            {showshipping()}
                                
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='col-md-9 pt-2'>
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4 className='text-danger'>Products</h4>)}
                    {products.length <1 && <p>No Produccts Found</p>}
                    <div className='row pb-5'>
                        {products.map((p)=>(
                            <div key={p._id} className='col-md-4 mt-3'>
                                <Productcard product={p}/>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    )
 }

 export default Shop