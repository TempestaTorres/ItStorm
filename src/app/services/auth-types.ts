export type LoginType = {
  email: string,
  password: string,
  rememberMe: boolean,
}
export type LoginSuccess = {
  accessToken: string,
  refreshToken: string,
  userId: string,
}
export type LoginFailure = {
  error: boolean,
  message: string,
}
export type SignupType = {
  name: string,
  email: string,
  password: string
}
export type User = {
  id: string,
  name: string,
  email: string,
}
