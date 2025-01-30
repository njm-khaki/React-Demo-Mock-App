import MockAdapter from "axios-mock-adapter";
import { UserIdMock } from "./_id";

export const UserMock = (mock: MockAdapter) => {
    UserIdMock(mock)
}