export type RequestType = {
  name: string,
  phone: string,
  service?: string,
  type: string,
}
export type ResponseType = {
  error: boolean,
  message: string,
}
export const requestTypes = {
  order: 'order',
  consultation: 'consultation',
}
