import MockAdapter from "axios-mock-adapter";
import { UserIdMock } from "./_id";

/**
 * ユーザーAPI モック
 * @param mock
 */
export const UserMock = (mock: MockAdapter) => {
  // ユーザーID APIのモック
  UserIdMock(mock);
};
