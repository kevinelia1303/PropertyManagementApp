import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm"
import { User } from "./user.entity"
@Entity({ name: "news" })
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    nullable: true,
  })
  category: string

  @Column({
    nullable: false,
  })
  title: string

  @Column({
    nullable: false,
  })
  description: string

  @Column({
    nullable: true,
  })
  imageUrl: string

  @DeleteDateColumn()
  deletedAt?: Date

  @ManyToOne(() => User, (user) => user.news_fkey)
  createdby: User
}
