import Movie from './Movie';
import React from 'react'
import {observable, action} from 'mobx'
import { Provider, observer } from 'mobx-react';
import MovieStore from './MovieStore';

class MyState {
  @observable num = 0;
  @action addNum = () => {
    this.num++;
  };
}
const newState = new MyState();

const movie = new MovieStore();

interface IProps {

}
@observer
export default class Main extends React.Component<IProps> {

  render() {
    return(
      <>
        {/* <div>
          <p>{newState.num}</p>
          <button onClick={newState.addNum}>+1</button>
        </div> */}
        <Movie movieStore={movie}/>
      </>
    )
  }

}
