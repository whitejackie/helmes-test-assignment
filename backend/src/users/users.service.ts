import { BadRequestException, Injectable } from '@nestjs/common';
import { getDb } from '../database/database.js';

export interface CreateUserDto {
  name: string;
  sectors: number[];
  agree: boolean;
}

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto): Promise<{
    id: number;
    name: string;
    sectors: number[];
    agree: boolean;
  }> {
    const { name, sectors, agree } = dto;

    if (!name?.trim()) throw new BadRequestException('Name is required');
    if (!Array.isArray(sectors) || sectors.length === 0) {
      throw new BadRequestException('At least one sector is required');
    }
    if (agree !== true) {
      throw new BadRequestException('You must agree to the terms');
    }

    const db = await getDb();
    await db.run('BEGIN');

    try {
      const result = await db.run(
        `INSERT INTO users (name, agree_to_terms) VALUES (?, ?)`,
        name.trim(),
        agree ? 1 : 0,
      );
      const userId = result.lastID;
      if (userId == null) {
        throw new Error('Failed to create user');
      }

      for (const sectorId of sectors) {
        await db.run(
          `INSERT INTO user_sectors (user_id, sector_id) VALUES (?, ?)`,
          userId,
          sectorId,
        );
      }
      await db.run('COMMIT');

      return { id: userId, name: name.trim(), sectors: sectors, agree: agree };
    } catch (e) {
      await db.run('ROLLBACK');
      throw e;
    }
  }
}
