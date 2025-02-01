import { HttpStatusCode } from "axios";
import MockAdapter from "axios-mock-adapter";
import { parseDynamicMockPath } from "../../../../api";
import { UserIdNameMock } from "./_name";

// APIのパス
const BASE_PATH = `api/v1/user/:id`;

/**
 * GETメソッド クエリパラメータ
 */
export interface UserGetParams {
  // 取得するユーザーのID
  id: number;
}

/**
 * GETメソッド レスポンスボディ
 */
export interface UserGetResponse {
  // ユーザーID
  id: number;
  // ユーザー名
  name: string;
}

/**
 * ユーザーID API モック
 * @param mock
 */
export const UserIdMock = (mock: MockAdapter) => {
  // ユーザー名API モック
  UserIdNameMock(mock);

  // GETメソッド
  mock.onGet(parseDynamicMockPath(BASE_PATH)).reply((config) => {
    console.log(`MOCK GET: ${BASE_PATH}`, config);

    const params = config.params as UserGetParams;

    return [
      HttpStatusCode.Ok,
      {
        id: params.id,
        name: `user${params.id}`,
      } as UserGetResponse,
    ];
  });
};
