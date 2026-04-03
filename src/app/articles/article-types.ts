import {CommentType} from '../comments/comment-type';

export type ArticleType = {
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string,
}
export type ArticlesType = {
  count: number,
  pages: number,
  items: ArticleType[],
}
export type SingleArticle = {
  text: string,
  comments: CommentType[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string,
}
export const ArticleImage = {
  path: '/assets/images/articles/',
}
