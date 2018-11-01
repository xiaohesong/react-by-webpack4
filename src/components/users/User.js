import React, {useState, useEffect} from 'react';
import {Button, Table, Divider, Input} from 'antd';
import { get } from '../../tools/request';

export default function count(){
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  
  //加[]是为了仅仅在`didMount`和`unmount`触发，去除每次的`didUpdate`
  //详细请参考 https://xiaohesong.gitbook.io/today-i-learn/front-end/react/hooks/effect-hook#ti-shi-tong-guo-tiao-guo-xiao-guo-you-hua-xing-neng
  useEffect(getUsers, [])

  return(
    <div>
      <Divider>计数器</Divider>
      <Button onClick={add} type='primary'>+</Button>
      <Input value={count} style={{width: '5%'}} disabled />
      <Button onClick={reduce} type='danger'>-</Button>
      <Divider>用户</Divider>
      <Table columns={columns} dataSource={users} />
    </div>
  )

  function add(){
    setCount(count => count + 1)
  }

  function reduce(){
    setCount(count => count ? count - 1 : count)
  }

  function getUsers(){
    get('users').then(data => {
      setUsers(data)
    })
  }
}

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}]