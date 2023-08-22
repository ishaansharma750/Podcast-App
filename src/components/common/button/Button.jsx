import React from 'react'
import "./button.css"

const Button = ({text,onClick,disabled,width}) => {
  return (
    <div onClick={onClick} className='custom-button' disabled={disabled} style={{width:width}}>
        {text}
    </div>
  )
}

export default Button