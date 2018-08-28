import React from 'react';
import { Button, Radio, Divider } from 'antd';
import Input from './inputs/Input'

import YanxiData from './YanXi'

const RadioGroup = Radio.Group;

class home extends React.PureComponent {
  constructor(props){
    super(props);
    this.videoRef = React.createRef();
  }
  
  state = {
    playing: false,
    number: 65,
    src: 'http://v.kd.qq.com/1116_5X00000000000000000000000006pJcV.f630.mp4?vkey=64A450FEC9BB03491DA4187FE6468A72039B961465791A1726B7F9B5E00A7792C699DAED840F520FE6F56709DF9EF7A3&guid=9B2D0B6E-C86A-4014-8C1E-765BD2E4E8E3',
  }
  render() {
    const {playing, src} = this.state
    const playText = playing ? '暂停' : '播放'
    return(
      <React.Fragment>
        <div className='app'>
          <Input value={src} onChange={this.changeSrc}/>
        </div>
        <Button onClick={this.toggle}>{playText}</Button>
        <Divider type="vertical" />
        <RadioGroup onChange={this.onChangeNumber} value={this.state.number}>
          {
            Object.keys(YanxiData).map(key => {
              return <Radio key={key} value={key}>第{key}集</Radio>
            })
          }
        </RadioGroup>
        <div className='video-play'>
          <video 
            id='video'
            ref={this.videoRef}
            src = {src}
          /> 
        </div>
      </React.Fragment>
    )
  }

  toggle = () => {
    const {playing} = this.state
    const ref = this.videoRef.current
    
    ref.controls = true
    this.setState({playing: !playing})
    playing ? ref.pause() : ref.play()
  }

  changeSrc = src => this.setState({src})

  onChangeNumber = e => {
    const {value} = e.target
    this.setState({number: value, src: YanxiData[value]})
  }
}


export default home