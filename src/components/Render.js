import React from 'react';

function Say(props) {
  console.log('say one component');
  
  return <h2>Say One{props.name}</h2>
}

class SayTwo extends React.Component {
  state = {id: 0, ids: [1]}

  sayTwo = () => {
    const id = this.state.id
    let ids = this.state.ids
    ids.push('xiaozhu')
    this.setState({
      id
    })
  }

  render(){
    console.log('say two render')
    return(
      <div>
        <h2>Say Two{this.props.name}</h2>
        <button onClick={this.sayTwo}>say two</button>
      </div>
    )
  }
}

class Render extends React.Component {
  state = {name: 'nihao', ids: [], friend: {ids: []}}
  setName = () => {
    let friend = this.state.friend
    friend.ids.push('xiaozhu--')
    this.setState({
      friend: friend
    })
  }

  sayName = () => this.state.name

  render(){
    console.log('render component');
    
    return(
      <React.Fragment>
        <span>Hei, My Girl</span>
        {/* <Say name={this.state.ids} /> */}
        <SayTwo name={this.state.ids}/>
        <button onClick={this.setName}>改变</button>
      </React.Fragment>
    )
  }
}

export default Render
export const Myrender = Render

// const mr = new Myrender
// console.log('it is', mr.sayName())
