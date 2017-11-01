import api, { handleError as handleErr } from './api'
import mockApi, { mockHandleError } from '../../test/mockRequest'

const isEnvTest = process.env.NODE_ENV === 'test'

export default isEnvTest ? mockApi : api

export const handleError = isEnvTest ? mockHandleError : handleErr
