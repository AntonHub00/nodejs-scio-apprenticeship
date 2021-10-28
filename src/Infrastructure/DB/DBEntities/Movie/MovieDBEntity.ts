import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Movie")
export default class MovieDBEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  releaseYear!: number;
}
