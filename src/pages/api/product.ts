export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  color: string
  size: string
  imagesSrc: { id: string; src: string }[]
  createdAt: string
}
