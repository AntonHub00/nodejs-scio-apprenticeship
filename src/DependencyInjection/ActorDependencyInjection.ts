import ActorRepository from "../Infrastructure/DB/DBEntities/Actor/ActorRepository";
import CreateActorUseCase from "../Domain/UseCases/Actor/CreateActorUseCase";
import UpdateActorUseCase from "../Domain/UseCases/Actor/UpdateActorUseCase";
import DeleteActorByIdUseCase from "../Domain/UseCases/Actor/DeleteActorByIdUseCase";
import FindActorByIdUseCase from "../Domain/UseCases/Actor/FindActorByIdUseCase";
import GetAllActorsUseCase from "../Domain/UseCases/Actor/GetAllActorsUseCase";

const actorRepository = new ActorRepository();

const createActorUseCase = new CreateActorUseCase(actorRepository);
const updateActorUseCase = new UpdateActorUseCase(actorRepository);
const deleteActorByIdUseCase = new DeleteActorByIdUseCase(actorRepository);
const findActorByIdUseCase = new FindActorByIdUseCase(actorRepository);
const getAllActorsUseCase = new GetAllActorsUseCase(actorRepository);

export {
  actorRepository,
  createActorUseCase,
  updateActorUseCase,
  deleteActorByIdUseCase,
  findActorByIdUseCase,
  getAllActorsUseCase,
};
