// src/controllers/ProfileController.ts
import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { BurritoService } from '../services/BurritoService';
import { Burrito } from '../entities/Burrito';

export class BurritoController {
  private burritoService: BurritoService;

  constructor(private readonly entityManager: EntityManager) {
    this.burritoService = new BurritoService(entityManager);
  }

  async createBurrito(req: Request, res: Response) {
    const { name, size, price } = req.body;
    const newBurrito: Burrito = await this.burritoService.createBurrito(name, size, price);
    res.json(newBurrito);
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
