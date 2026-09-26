import { Injectable } from '@nestjs/common';
import { getDb } from '../database/database.js';

export interface Sector {
  id: number;
  name: string;
  parentId: number | null;
  sortOrder: number;
}

@Injectable()
export class SectorsService {
  async findAll(): Promise<Sector[]> {
    const db = await getDb();

    const rows = await db.all(`
        SELECT id, name, parent_id AS parentId, sort_order AS sortOrder FROM sectors ORDER BY sort_order
      `);

    return rows as Sector[];
  }
}
