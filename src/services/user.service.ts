import { register } from "module"
import { PMADB } from "../data-source"
import { User } from "../entities/user.entity"
import { LoginParams, RegisterParams } from "../interfaces/user.interface"
import bcrypt, { genSalt, genSaltSync } from "bcrypt"
import { sign } from "jsonwebtoken"
import { SECRET_KEY } from "../config"
import { PayloadParams } from "../custom"

const UserService = {
  findOneByEmail: async (email: string) => {
    try {
      return await PMADB.getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne()
    } catch (error) {
      throw error
    }
  },
  register: async ({ email, password, name }: RegisterParams) => {
    let avatar = ""
    try {
      const user = await UserService.findOneByEmail(email)

      if (user) {
        // throw new HttpException (500, "User with that email already exist")
      }

      // if (file) {
      //   const { secure_url } = await cloudinaryUpload(file)
      //   avatar = secure_url
      //   // avatar = file.filename
      // }

      const salt = await genSalt(10) // membuat sudo random number
      const hashPassword = await bcrypt.hash(password, salt)
      console.log(hashPassword)

      await PMADB.createQueryBuilder()
        .insert()
        .into(User)
        .values({ email, password: hashPassword, name, avatar })
        .execute()

      // const templatePath = path.join(
      //   __dirname,
      //   "../templates",
      //   "registration-template.hbs"
      // )

      // const templateSource = fs.readFileSync(templatePath, "utf-8")
      // const compiledTemplate = handlebars.compile(templateSource)
      // const html = compiledTemplate({name}) // untuk masukin nama ke template

      // await transporter.sendMail({
      //   from: "Sender Address",
      //   to: email,
      //   subject: "Register",
      //   html: "<h1>Thank you</h1>",
      // })
    } catch (error) {
      // await cloudinaryRemove(avatar)
      throw error
    }
  },
  login: async ({ email, password }: LoginParams) => {
    try {
      const user = await UserService.findOneByEmail(email)

      //   if (!user) {
      //     // throw new HttpException (500, "Email incorrect")
      //   }

      if (!user) {
        throw new Error("Email incorrect")
      }
      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        // throw new HttpException (500, "Password is incorrect")
      }

      const payload = {
        uuid: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
      const access_token = sign(payload, SECRET_KEY as string, {
        expiresIn: "1h",
      }) // untuk refresh session token (taro di cookies)
      const session_token = sign(payload, SECRET_KEY as string, {
        expiresIn: "5m",
      })

      return {
        access_token,
        session_token,
        user: payload,
      }
    } catch (error) {
      throw error
    }
  },
  refreshToken: async (email: string) => {
    try {
      const user = await UserService.findOneByEmail(email)

      //   if (!user) {
      //     // throw new HttpException (500, "Email incorrect")
      //   }

      if (!user) {
        throw new Error("Something went wrong")
      }

      const payload = {
        email: user.email,
        name: user.name,
        role: user.role,
      }
      const access_token = sign(payload, SECRET_KEY as string, {
        expiresIn: "1h",
      }) // untuk refresh session token (taro di cookies)
      const session_token = sign(payload, SECRET_KEY as string, {
        expiresIn: "5m",
      })

      return {
        access_token,
        session_token,
        user: payload,
      }
    } catch (error) {
      throw error
    }
  },
}

export default UserService
