import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    nullable: false,
  })
  email: string

  @Column({
    nullable: false,
  })
  password: string

  @Column()
  name: string

  @Column({
    type: "enum",
    enum: ["USER", "ADMIN", "MANAGER"],
    default: "USER",
  })
  role: string

  @Column({
    nullable: true,
  })
  avatar?: string
}
