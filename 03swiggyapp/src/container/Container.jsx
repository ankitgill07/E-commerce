import React from 'react'

function Container({children}) {
  return (
    <div className='w-full relative top-[80px]'>
      <div className='w-full max-w-[1450px] mx-auto flex justify-center'>
     {children}
    </div>
    </div>
  )
}

export default Container