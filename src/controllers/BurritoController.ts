import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { BurritoService } from '../services/BurritoService';
import { Burrito } from '../entities/Burrito';

export class BurritoController {
  private burritoService: BurritoService;

  constructor(private readonly entityManager: EntityManager) {
    this.burritoService = new BurritoService(entityManager);
  }

  async createBurrito() {
    const burritos: Burrito[] | null = await this.burritoService.getAllBurritos();
    if (!burritos || burritos.length==0) {
    // Creating Db statically here. In production env, there would be a migration or a different API.
    const newBurrito: Burrito = await this.burritoService.createBurrito("Chicken Burrito", "Regular", 5);
    await this.burritoService.createBurrito("Chicken Burrito", "XL", 10);
    await this.burritoService.createBurrito("Veggie Burrito", "Regular", 20);
    }
  }

  async getAllBurritos(req: Request, res: Response) {
    const burritos: Burrito[] | null = await this.burritoService.getAllBurritos();
    if (burritos) {
      res.json(burritos);
    } else {
      res.status(404).json({ error: 'No burritos :(' });
    }
  }
}
