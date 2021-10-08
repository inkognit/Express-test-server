export type TUserRole = {
  ADMIN?: 'ADMIN'
  USER: 'USER'
}

// USERS
export type TPageUser_item = {
  id?: string
  created_at: any
  nick_name: string
  first_name: string
  last_name: string
  description: string
  birthday: any
  role?: TUserRole
  userPass: TUserPass
}
export type TPageUser_vars = { id: string }

export type TUserCreate_var = {}

//USERS PASS
export type TUserPass = {
  id?: string
  pass: string
}
