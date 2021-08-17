import React from 'react'
import StarRating from 'react-star-ratings'

const Star = ({starClick,numberOfStar}) => <>

    <StarRating
        changeRating={()=>starClick(numberOfStar)}
        numberOfStars={numberOfStar}
        starDimension='20px'
        starSpacing='2px'
        starHoverColor='red'
        starEmptyColor='red'

    />
    <br/>
    </>

export default Star ;
