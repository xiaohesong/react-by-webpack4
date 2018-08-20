import React from 'react';
import './Input.css'

const input = (props) => (
  <div className='main'>
    <input className="main" type="text" onChange={handleChange} value={props.value}/>
  </div>
)

const handleChange = e => {
  const {value} = e.target
  console.log('value is', value)
}

export default input