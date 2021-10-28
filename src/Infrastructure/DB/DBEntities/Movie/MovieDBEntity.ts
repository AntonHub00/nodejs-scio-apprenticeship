import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ActorDBEntity from "../Actor/ActorDBEntity";

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

  @ManyToMany((type) => ActorDBEntity, (actor) => actor.movies, {
    cascade: true,
  })
  @JoinTable()
  actors!: ActorDBEntity[];
}
