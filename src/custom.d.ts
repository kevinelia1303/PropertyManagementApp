export interface PayloadParams {
  name: string
  email: string
  role: string
}

declare global {
  namespace Express {
    export interface Request {
      user?: PayloadParams
    }
  }
}
