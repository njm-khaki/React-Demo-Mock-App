import { HttpStatusCode } from 'axios'
import MockAdapter from 'axios-mock-adapter'

const BASE_PATH = `api/v1/count`

export interface CountPostRequest {
  value: number
}

export const CountMock = (mock: MockAdapter) => {
  let value: number = 0

  mock.onGet(BASE_PATH).reply((config) => {
    console.log(`MOCK GET: ${BASE_PATH}`, config)
    return [HttpStatusCode.Ok, value]
  })

  mock.onPost(BASE_PATH).reply((config) => {
    console.log(`MOCK POST: ${BASE_PATH}`, config)
    const request = JSON.parse(config.data) as CountPostRequest
    value = request.value
    return [HttpStatusCode.Ok]
  })
}
