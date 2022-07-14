export type User = {
  id?: number
  full_name: string
  password: string
}

export type Product = {
  id?: number
  product_name: string
  price: string
}

export type Order = {
  id?: number
  total: string
  user_id: string
}
