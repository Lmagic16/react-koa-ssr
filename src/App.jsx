import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  const [repoData, setRepoData] = useState([]);

  // https://api.github.com/ 非AUTH认证请求会有限速，若希望不限速可以通过后面拼接参数走 OAuth2 key/secret 认证方式 ?client_id=YOUR-CLIENT-ID&client_secret=YOUR-CLIENT-SECRET
  const getGithubRepos = () => {
    axios({
      method: 'get',
      url: 'https://api.github.com/users/Lmagic16/repos',
    }).then(function (response) {
        setRepoData(response.data);
      });
  }

  useEffect(() => {
    getGithubRepos();
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