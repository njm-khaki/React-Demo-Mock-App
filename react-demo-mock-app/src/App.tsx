import axios, { HttpStatusCode } from "axios";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { mock } from "./mocks/api";
import { SumPostRequest } from "./mocks/api/v1/sum";
import { CountPostRequest } from "./mocks/api/v1/count";
import viteLogo from "/vite.svg";
import { UserGetParams, UserGetResponse } from "./mocks/api/v1/user/_id";
import {
  UserIdNamePostParams,
  UserIdNamePostResponse,
} from "./mocks/api/v1/user/_id/_name";

console.log(`use mock: ${import.meta.env.VITE_APP_USE_MOCK}`);
if (import.meta.env.VITE_APP_USE_MOCK === "true") {
  mock();
}

function App() {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  const [userId, setUserId] = useState(0);
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
        <button
          onClick={async () => {
            await axios.post(`api/v1/count`, {
              value: Math.round(10 * Math.random()),
            } as CountPostRequest);
            const response = await axios.get(`api/v1/count`);
            setCount(response.data);
          }}
        >
          count is {count}
        </button>
        <button
          onClick={async () => {
            await axios.post(`api/v1/sum`, {
              value: count,
            } as SumPostRequest);

            const response = await axios.get(`api/v1/sum`);
            setSum(response.data);
          }}
        >
          sum is {sum}
        </button>
        <button
          onClick={async () => {
            const response = await axios.get(`api/v1/user/`, {
              params: {
                id: count,
              } as UserGetParams,
            });

            const data = response.data as UserGetResponse;
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
      <button
        onClick={async () => {
          const response = await axios.post(`api/v1/user/${userId}/`, {
            name: userName,
          } as UserIdNamePostParams);

          if (response.status !== HttpStatusCode.Ok) {
            alert(`sing up failed`);
            return;
          }

          const data = response.data as UserIdNamePostResponse;
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
