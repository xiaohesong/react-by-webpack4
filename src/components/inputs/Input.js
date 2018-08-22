import React from 'react';
import img from './1.jpeg'
import {Input} from 'antd'
import './Input.css'

const input = (props) => {
  const handleChange = e => props.onChange(e.target.value)

  return(
    <div className='main'>
      <img src={img} alt="美不美"/>
      <Input className="main" type="text" value={props.value} onChange={handleChange}/>
    </div>
  )
}

export default input