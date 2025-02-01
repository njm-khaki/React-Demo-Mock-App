import { HttpStatusCode } from "axios";
import MockAdapter from "axios-mock-adapter";
import { parseDynamicMockPath } from "../../../../api";
import { UserIdNameMock } from "./_name";

const BASE_PATH = `api/v1/user/:id`;

export interface UserGetParams {
  id: number;
}

export interface UserGetResponse {
  id: number;
  name: string;
}

export const UserIdMock = (mock: MockAdapter) => {
  UserIdNameMock(mock);

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
