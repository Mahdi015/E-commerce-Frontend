import React from 'react'
import { Link } from 'react-router-dom'

const Productlistitem =({product}) =>{
const {price,category,slug,subs,brand,color
,quantity,sold,shipping} = product
return(
    <ul className='list-group'>
        <li className='list-group-item'>
            <h6>Price{''}</h6>
            <span className='label label-default label-pill pull-xs-right'>
                ${price}

            </span>
        </li>
     { category &&   <li className='list-group-item'>
           <h6> Category{''}</h6>
            <Link to={`/category/${category.slug}`} className='label label-default label-pill pull-xs-right'>
                {category.name}

            </Link>
        </li>}


        { subs && <li className='list-group-item'>
            <h6>Sub Category{''}</h6>
            {subs.map((s)=>(
                <Link key={s._id} to={`/subs/${s.slug}`} className='label label-default label-pill pull-xs-right'>
                {s.name}

            </Link>
            ))}
           
        </li>}


        <li className='list-group-item'>
            <h6>Shipping{''}</h6>
            <span className='label label-default label-pill pull-xs-right'>
                {shipping}

            </span>
        </li>
        <li className='list-group-item'>
            <h6>Color{''}</h6>
            <span className='label label-default label-pill pull-xs-right'>
                {color}

            </span>
        </li>
        <li className='list-group-item'>
            <h6>Brand{''}</h6>
            <span className='label label-default label-pill pull-xs-right'>
                {brand}

            </span>
        </li>

        <li className='list-group-item'>
            <h6>Quantity{''}</h6>
            <span className='label label-default label-pill pull-xs-right'>
                {quantity}

            </span>
        </li>

        <li className='list-group-item'>
            <h6>Sold{''}</h6>
            <span className='label label-default label-pill pull-xs-right'>
                {sold}

            </span>
        </li>

    </ul>
)


}
export default Productlistitem