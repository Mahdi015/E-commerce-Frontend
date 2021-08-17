import React from 'react'
import StarRating from 'react-star-ratings';

export const showAverage=(p) =>{
    if (p && p.ratings){
        let ratingsArray = p && p.ratings
        let total = []
        let length = ratingsArray.length    

        ratingsArray.map((r)=> total.push(r.star))
        let totalReduced =  total.reduce((p,n)=>p+n,0)
        let hightes = length * 5
        let result = totalReduced * 5 / hightes

        return(
            <div className='text-center pt-1 pb-3'>
            <span>
             
                <StarRating
                    rating={result}
                    starDimension='20px'
                    starSpacing='2px'
                    starRatedColor='red'
                    editing={false}
                />{""}
                ({length}) 

                
            </span>

            </div>
        )
    }
}
