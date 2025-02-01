import { HttpStatusCode } from "axios";
import MockAdapter from "axios-mock-adapter";

// APIのパス
const BASE_PATH = `api/v1/count`;

/**
 * api/v1/count
 * POSTメソッド リクエストボディ
 */
export interface CountPostRequest {
  value: number;
}

/**
 * カウントAPI モック
 * @param mock
 */
export const CountMock = (mock: MockAdapter) => {
  // POSTで受け取った値を保持しておく
  let value: number = 0;

  // GETメソッド
  mock.onGet(BASE_PATH).reply((config) => {
    console.log(`MOCK GET: ${BASE_PATH}`, config);
    // POSTで保持しておいた値を返却
    return [HttpStatusCode.Ok, value];
  });

  // POSTメソッド
  mock.onPost(BASE_PATH).reply((config) => {
    console.log(`MOCK POST: ${BASE_PATH}`, config);

    // リクエストボディをパースして
    // 受け取った値を保持しておく
    const request = JSON.parse(config.data) as CountPostRequest;
    value = request.value;

    // 200 OKを返却
    return [HttpStatusCode.Ok];
  });
};
