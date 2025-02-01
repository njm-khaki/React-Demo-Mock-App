import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CountMock } from "./api/v1/count";
import { SumMock } from "./api/v1/sum";
import { UserMock } from "./api/v1/user";

/**
 * モックの起動
 */
export const mock = () => {

    // axiosのモック インスタンス生成
    const mockAxios = new MockAdapter(axios);

    CountMock(mockAxios);
    SumMock(mockAxios);
    UserMock(mockAxios);
}

export const parseDynamicMockPath = (path: string) => {
    const trimedPath = path.replace(/:\w+$/, ``);

    return trimedPath.match(/:\w+/g)
        ? new RegExp(trimedPath.replace(/:\w+/g, `[^/]+`))
        : trimedPath
}

export const matchDynamicPathParameter = (path: string, url: string | undefined) => {
    const pattern = path.replace(/:\w+$/, ``).replace(/:\w+/g, `([^/]+)`);

    const params = url?.match(RegExp(pattern));

    return params?.slice(1) ?? []
}