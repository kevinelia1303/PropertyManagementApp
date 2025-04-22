export interface RegisterParams {
  email: string
  name: string
  password: string
  // file?: Express.Multer.File | undefined
}

export interface LoginParams {
  email: string
  password: string
}
