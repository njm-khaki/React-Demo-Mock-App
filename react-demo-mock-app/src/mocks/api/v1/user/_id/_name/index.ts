import MockAdapter from "axios-mock-adapter";
import {
  matchDynamicPathParameter,
  parseDynamicMockPath,
} from "../../../../../api";
import { HttpStatusCode } from "axios";

// APIのパス
const BASE_PATH = `api/v1/user/:id/:name`;

/**
 * ユーザー名API POSTメソッド リクエストボディ
 */
export interface UserIdNamePostParams {
  // ユーザー名
  name: string;
}

/**
 * ユーザー名API POSTメソッド レスポンスボディ
 */
export interface UserIdNamePostResponse {
  // ユーザーID
  id: number;
  // ユーザー名
  name: string;
}

/**
 * ユーザー名API モック
 * @param mock
 */
export const UserIdNameMock = (mock: MockAdapter) => {
  // POSTメソッド
  mock.onPost(parseDynamicMockPath(BASE_PATH)).reply((config) => {
    console.log(`MOCK POST: ${BASE_PATH}`, config);

    try {
      // URLからユーザー名を設定するユーザーIDを取得
      const [id] = matchDynamicPathParameter(BASE_PATH, config.url);

      // 設定するユーザー名を取得
      const params = JSON.parse(config.data) as UserIdNamePostParams;

      // 200 OK
      // 設定したユーザー情報を返却
      return [
        HttpStatusCode.Ok,
        {
          id: Number(id),
          name: params.name,
        } as UserIdNamePostResponse,
      ];
    } catch {
      
      // パラメータの取得などに失敗したとき
      // 500エラーで対応
      return [HttpStatusCode.InternalServerError];
    }
  });
};
