import axios, { HttpStatusCode } from "axios";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { mock } from "./mocks/api";
import { CountPostRequestBody } from "./mocks/api/v1/count/@types";
import { SumPostRequestBody } from "./mocks/api/v1/sum/@types";
import {
  UserGetQueryParams,
  UserGetResponseBody,
} from "./mocks/api/v1/user/_id/@types";
import {
  UserIdNamePostParams,
  UserIdNamePostResponseBody,
} from "./mocks/api/v1/user/_id/_name/@types";
import viteLogo from "/vite.svg";

console.log(`use mock: ${import.meta.env.VITE_APP_USE_MOCK}`);
if (import.meta.env.VITE_APP_USE_MOCK === "true") {
  mock();
}

function App() {
  // カウント値
  const [count, setCount] = useState(0);
  // カウントした値の合計値
  const [sum, setSum] = useState(0);

  // ユーザーID
  const [userId, setUserId] = useState(0);
  // ユーザー名
  const [userName, setUserName] = useState(``);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* カウント値 ボタン */}
        <button
          onClick={async () => {
            // 適当な値をPOSTする
            await axios.post(`api/v1/count`, {
              value: Math.round(10 * Math.random()),
            } as CountPostRequestBody);

            // POSTした値を受け取ってカウント値として更新
            const response = await axios.get(`api/v1/count`);
            setCount(response.data);
          }}
        >
          count is {count}
        </button>
        {/* 合計値 ボタン */}
        <button
          onClick={async () => {
            // カウント値をPOSTする
            await axios.post(`api/v1/sum`, {
              value: count,
            } as SumPostRequestBody);

            // 現在の合計値を取得して更新
            const response = await axios.get(`api/v1/sum`);
            setSum(response.data);
          }}
        >
          sum is {sum}
        </button>
        {/* ユーザーID ボタン */}
        <button
          onClick={async () => {
            // カウント値をIDとしたユーザーの情報を取得
            // 取得したユーザーのIDを更新
            const response = await axios.get(`api/v1/user/`, {
              params: {
                id: count,
              } as UserGetQueryParams,
            });

            const data = response.data as UserGetResponseBody;
            setUserId(data.id);
          }}
        >
          user id: {userId}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <input
        type="text"
        placeholder="input your name"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      {/* サインアップ ボタン */}
      <button
        onClick={async () => {
          // ユーザー情報を登録
          const response = await axios.post(`api/v1/user/${userId}/`, {
            name: userName,
          } as UserIdNamePostParams)
          .catch((_) => { return null });

          // 200 OK以外のときはアラート表示して終了
          if (response?.status !== HttpStatusCode.Ok) {
            alert(`sing up failed`);
            return;
          }

          // 登録したユーザー情報を表示
          const data = response.data as UserIdNamePostResponseBody;
          alert(`sign up success!! your id: ${data.id} name: ${data.name}`);
        }}
      >
        sign up
      </button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
