import React from 'react'

const RoundedContainer = ({className, children}:{className?:string, children:React.ReactNode}) => {
  return (
    <div className={`bg-white rounded-[8px] p-[20px] ${className}`}>
        {children}
    </div>
  )
}

export default RoundedContainer