import { HttpStatusCode } from "axios";
import MockAdapter from "axios-mock-adapter";

// APIのパス
const BASE_PATH = `api/v1/sum`;

/**
 * api/v1/sum
 * POSTメソッド リクエストボディ
 */
export interface SumPostRequest {
  value: number;
}

/**
 * 合計値算出API モック
 * @param mock
 */
export const SumMock = (mock: MockAdapter) => {
  // POSTされた値の合計値を保持
  let value: number = 0;

  // GETメソッド
  mock.onGet(BASE_PATH).reply((config) => {
    console.log(`MOCK GET: ${BASE_PATH}`, config);

    // POSTされた値の合計値を返却
    return [HttpStatusCode.Ok, value];
  });

  // POSTメソッド
  mock.onPost(BASE_PATH).reply((config) => {
    console.log(`MOCK POST: ${BASE_PATH}`, config);

    // リクエストボディの値をパースして
    // 受け取った値を合計値に加算する
    const request = JSON.parse(config.data) as SumPostRequest;
    value += request.value;

    // 200 OK
    return [HttpStatusCode.Ok];
  });
};
