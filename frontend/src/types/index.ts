export type Pin = {
  _id: string,
  createdAt: string,
  title: string,
  image: string,
  content: string,
  latitude: number,
  longitude: number,
  author: Author,
  comments: any[],
  isNewPin?: boolean;
}

export type Author = {
  _id: string,
  name: string,
  email: string,
  picture: string
}

export type User = {
  _id: string,
  name: string,
  email: string,
  picture: string
}
