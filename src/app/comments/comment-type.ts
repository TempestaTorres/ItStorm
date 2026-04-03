export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: {
    id: string,
    name: string,
  }
}
export type CommentsType = {
  allCount: number,
  comments: CommentType[]
}
export type CommentResponse = {
  error: boolean,
  message: string,
}
export type AddCommentType = {
  "text": string,
  "article": string,
}
export type CommentAction = {
  comment: string,
  action: string,
}
export type ApplyAction = {
  action: string
}
export type ApplyActionResponse = {
  error: boolean,
  message: string,
}
export const UserCommentActions = {
  like: 'like',
  dislike: 'dislike',
  violate: 'violate',
}
