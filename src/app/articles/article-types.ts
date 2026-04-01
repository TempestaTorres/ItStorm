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
export const ArticleImage = {
  path: '/assets/images/articles/',
}
