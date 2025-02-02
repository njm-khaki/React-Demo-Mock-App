/**
 * ユーザー名API POSTメソッド パラメータ
 */
export interface UserIdNamePostParams {
  // ユーザー名
  name: string;
}

/**
 * ユーザー名API POSTメソッド レスポンスボディ
 */
export interface UserIdNamePostResponseBody {
  // ユーザーID
  id: number;
  // ユーザー名
  name: string;
}
