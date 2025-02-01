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

/**
 * モックするURL
 * 静的/動的URLに応じたパスを返却
 * 動的URLの記載ルール
    * 可変部分は`:`から始まる文字列を割り当てる
    * 例 idの部分が可変
    * `api/:id/user`
 * @param path APIのパス(文字列) {string}
 * @returns モックに設定するパス {string | RegExp} 
 */
export const parseDynamicMockPath = (path: string) => {
    // URLの末端が可変のときは正規表現で指定する必要はない
    const trimedPath = path.replace(/:\w+$/, ``);

    // 動的URLを指定しているなら正規表現で返却
    return trimedPath.match(/:\w+/g)
        // :から始まる文字列を置き換える
        ? new RegExp(trimedPath.replace(/:\w+/g, `[^/]+`))
        // 静的なURLは文字列で指定して設定する
        : trimedPath
}

export const matchDynamicPathParameter = (path: string, url: string | undefined) => {
    const pattern = path.replace(/:\w+$/, ``).replace(/:\w+/g, `([^/]+)`);

    const params = url?.match(RegExp(pattern));

    return params?.slice(1) ?? []
}