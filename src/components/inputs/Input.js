import React from 'react';
import img from './1.jpeg'
import './Input.css'

const input = (props) => (
  <div className='main'>
    <img src={img} alt="美不美"/>
    <input className="main" type="text" onChange={handleChange} value={props.value}/>
  </div>
)

const handleChange = e => {
  const {value} = e.target
  console.log('value is', value)
}

export default input