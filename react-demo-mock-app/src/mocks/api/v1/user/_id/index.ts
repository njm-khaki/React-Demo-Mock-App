import { HttpStatusCode } from "axios";
import MockAdapter from "axios-mock-adapter";
import { parseDynamicMockPath } from "../../../../api";
import { UserGetQueryParams, UserGetResponseBody } from "./@types";
import { UserIdNameMock } from "./_name";

// APIのパス
const BASE_PATH = `api/v1/user/:id`;

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

    // クエリパラメータを取得
    const params = config.params as UserGetQueryParams;

    // ユーザー情報を返却
    return [
      HttpStatusCode.Ok,
      {
        id: params.id,
        name: `user${params.id}`,
      } as UserGetResponseBody,
    ];
  });
};
