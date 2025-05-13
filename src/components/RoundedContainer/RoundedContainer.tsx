import React from 'react'

const RoundedContainer = ({className, children}:{className?:string, children:React.ReactNode}) => {
  return (
    <div className={`bg-white dark:bg-[#212121] rounded-[8px] px-[40px] py-[40px] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] ${className}`}>
  
        {children}
    </div>
  )
}

export default RoundedContainer