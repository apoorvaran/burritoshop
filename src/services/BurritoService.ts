import { EntityManager } from 'typeorm';
import { Burrito } from '../entities/Burrito';

export class BurritoService {
  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async createBurrito(name: string, size: string, price: number): Promise<Burrito> {
    const burrito = new Burrito();
    burrito.name = name;
    burrito.size = size;
    burrito.price = price;

    return await this.entityManager.save(Burrito, burrito);
  }

  async getAllBurritos(): Promise<Burrito[] | null> {
    return await this.entityManager.find(Burrito);
  }

  async getBurritobyBurritoId(burritoId: number): Promise<Burrito | null> {
    return await this.entityManager.findOne(Burrito, {where: {id:burritoId}});
  }

}
