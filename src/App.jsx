import React, { useState, useEffect } from 'react';
import axios from 'axios';
const isBrowser = typeof window !== 'undefined'; // 浏览器端

export const getInitData = () => {
  return axios({
    method: 'get',
    url: 'https://api.github.com/users/Lmagic16/repos',
  })
}

export default function App(props) {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  const [repoData, setRepoData] = useState(props.data || []);

  // https://api.github.com/ 非AUTH认证请求会有限速，若希望不限速可以通过后面拼接参数走 OAuth2 key/secret 认证方式 ?client_id=YOUR-CLIENT-ID&client_secret=YOUR-CLIENT-SECRET
  const clientLoadData = async () => {
    // 数据脱水处理
    if(isBrowser && window.__server_initial_data__){
      setRepoData(window.__server_initial_data__);
      return;
    }

    // 若在浏览器端没有数据，则浏览器端重拉
    const response = await getInitData();
    if(response.status !== 0) {
      // 异常处理
      return;
    }
    setRepoData(response.data);
  }

  useEffect(() => {
    clientLoadData();
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <h2>my github repos:</h2>
      <ul>
        {repoData.map((repo) => <li key={repo.id}>{repo.name}</li>)}
      </ul>
    </div>
  );
}