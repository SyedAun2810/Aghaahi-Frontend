import React from 'react'

type DiscountedPriceType = {
    className?:string;
    color?:string;
    size?:number
    value:string|number
}
const DiscountedPriceText = (props:DiscountedPriceType) => {
    const {
        className,
        color= "#717171",
        value
    } = props;


  return (
    <p className={`${className} text-[${color}] `}><s>${value}</s></p>
  )
}

export default DiscountedPriceText
