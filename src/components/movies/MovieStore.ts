import {observable, action, extendObservable} from 'mobx';

type IModel = {
  [key: string]: number | string
}

class MovieStore {
  @observable model: IModel = {}

  @action
  change = (name: string, value: string | number) => {
    this.model = {
      ...this.model,
      [name]: value
    }
  };

  @action
  reset = () => {
    this.model = {
      ...this.model,
      name: 'yourname',
      price: 99,
      area: '华南'
    }
  }
}

export default MovieStore