import IActorCreateDTO from "./IActorCreateDTO";
import IActorDTO from "./IActorDTO";

export default interface IActorRespository {
  createActor: (actor: IActorCreateDTO) => Promise<IActorDTO>;
  findActorById: (id: number) => Promise<IActorDTO | null>;
  updateActor: (id: number, actor: IActorCreateDTO) => Promise<void>;
  deleteActorById: (id: number) => Promise<void>;
  getAllActors: () => Promise<IActorDTO[]>;
}
