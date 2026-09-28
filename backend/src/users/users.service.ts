import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getDb } from '../database/database.js';

export interface CreateUserDto {
  name: string;
  sectors: number[];
  agree: boolean;
}

export interface UserResponse {
  id: number;
  name: string;
  sectors: number[];
  agree: boolean;
}

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto): Promise<UserResponse> {
    this.validate(dto);

    const db = await getDb();
    await db.run('BEGIN');

    try {
      const result = await db.run(
        `INSERT INTO users (name, agree_to_terms) VALUES (?, ?)`,
        dto.name.trim(),
        dto.agree ? 1 : 0,
      );
      const userId = result.lastID;
      if (userId == null) {
        throw new Error('Failed to create user');
      }

      for (const sectorId of dto.sectors) {
        await db.run(
          `INSERT INTO user_sectors (user_id, sector_id) VALUES (?, ?)`,
          userId,
          sectorId,
        );
      }
      await db.run('COMMIT');

      return {
        id: userId,
        name: dto.name.trim(),
        sectors: dto.sectors,
        agree: dto.agree,
      };
    } catch (e) {
      await db.run('ROLLBACK');
      throw e;
    }
  }

  async update(id: number, dto: CreateUserDto): Promise<UserResponse> {
    this.validate(dto);

    const db = await getDb();

    const existingUser = await db.get('SELECT id FROM users WHERE id = ?', id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await db.run('BEGIN');

    try {
      await db.run(
        `UPDATE users
         SET name = ?, agree_to_terms = ?, updated_at = datetime('now')
         WHERE id = ?`,
        dto.name.trim(),
        dto.agree ? 1 : 0,
        id,
      );

      await db.run('DELETE FROM user_sectors WHERE user_id = ?', id);
      for (const sectorId of dto.sectors) {
        await db.run(
          `INSERT INTO user_sectors (user_id, sector_id) VALUES (?, ?)`,
          id,
          sectorId,
        );
      }

      await db.run('COMMIT');

      return {
        id,
        name: dto.name.trim(),
        sectors: dto.sectors,
        agree: dto.agree,
      };
    } catch (e) {
      await db.run('ROLLBACK');
      throw e;
    }
  }

  private validate(dto: CreateUserDto) {
    if (!dto.name?.trim()) {
      throw new BadRequestException('Name is required');
    }
    if (!Array.isArray(dto.sectors) || dto.sectors.length === 0) {
      throw new BadRequestException('At least one sector is required');
    }
    if (dto.agree !== true) {
      throw new BadRequestException('You must agree to the terms');
    }
  }
}
