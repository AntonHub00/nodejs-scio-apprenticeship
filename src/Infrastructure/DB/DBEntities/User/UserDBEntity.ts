import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("User")
export default class UserDBEntity {
  @PrimaryColumn()
  username!: string;

  @Column()
  password!: string;
}
