/**
 * GETメソッド クエリパラメータ
 */
export interface UserGetQueryParams {
  // 取得するユーザーのID
  id: number;
}

/**
 * GETメソッド レスポンスボディ
 */
export interface UserGetResponseBody {
  // ユーザーID
  id: number;
  // ユーザー名
  name: string;
}
