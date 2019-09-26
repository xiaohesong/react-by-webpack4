import React from 'react';
import {Form} from 'antd';
import styles from './index.module.css';
import MovieStore from './MovieStore';
import {observer, inject} from 'mobx-react';

interface IProps {
  movieStore: MovieStore
}

@observer
class X extends React.Component<IProps> {

  handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('click reset button');
    
    const {movieStore} = this.props
    movieStore && movieStore.reset()
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    const {movieStore} = this.props
    movieStore && movieStore.change(name, value)
  }

  render() {
    console.log('re-render movie is', this.props.movieStore);
    const {movieStore} = this.props
    return(
      <form className={styles['movie-form']}>
        <div>
          <label>电影名:</label>
          <input name='name' value={movieStore.model.name} onChange={this.handleChange}></input>
        </div>
        <div>
          <label>票价:</label>
          <input name='price' value={movieStore.model.price} onChange={this.handleChange}></input>
        </div>
        <div>
          <label>上映区:</label>
          <input name='area' value={movieStore.model.area} onChange={this.handleChange}></input>
        </div>
        <div>
          <label></label>
          <button onClick={this.handleClick}>重置{movieStore.model.name}</button>
        </div>
      </form>
    )
  }
}
export default X