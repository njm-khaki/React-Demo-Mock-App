import MockAdapter from "axios-mock-adapter";
import {
  matchDynamicPathParameter,
  parseDynamicMockPath,
} from "../../../../../api";
import { HttpStatusCode } from "axios";

const BASE_PATH = `api/v1/user/:id/:name`;

export interface UserIdNamePostParams {
  name: string;
}

export interface UserIdNamePostResponse {
  id: number;
  name: string;
}

export const UserIdNameMock = (mock: MockAdapter) => {
  mock.onPost(parseDynamicMockPath(BASE_PATH)).reply((config) => {
    console.log(`MOCK POST: ${BASE_PATH}`, config);

    try {
      const [id] = matchDynamicPathParameter(BASE_PATH, config.url);

      const params = JSON.parse(config.data) as UserIdNamePostParams;

      return [
        HttpStatusCode.Ok,
        {
          id: Number(id),
          name: params.name,
        } as UserIdNamePostResponse,
      ];
    } catch {
      return [HttpStatusCode.InternalServerError];
    }
  });
};
