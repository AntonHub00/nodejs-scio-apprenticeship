import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import MovieDBEntity from "../Movie/MovieDBEntity";

@Entity("Actor")
export default class ActorDBEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  yearOfBirth!: number;

  @ManyToMany((type) => MovieDBEntity, (movie) => movie.actors)
  movies!: MovieDBEntity[];
}
