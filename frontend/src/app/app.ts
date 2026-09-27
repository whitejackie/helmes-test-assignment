import { Component, computed, inject } from '@angular/core';
import { Sector } from './interfaces/sector';
import { SectorsService } from './services/sectors.service';
import { toSignal } from '@angular/core/rxjs-interop';

interface SectorWithDepth extends Sector {
  depth: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private sectorsService = inject(SectorsService);
  private sectors = toSignal(this.sectorsService.getSectors(), { initialValue: [] as Sector[] });

  sectorsWithDepth = computed(() => {
    const list = this.sectors();
    return this.orderSectors(list);
  });

  childrenMap = new Map<number | null, Sector[]>();

  orderSectors(list: Sector[]): SectorWithDepth[] {
    const childrenMap = new Map<number | null, Sector[]>();

    for (const sector of list) {
      const key = sector.parentId;
      if (!childrenMap.has(key)) {
        childrenMap.set(key, []);
      }
      childrenMap.get(key)!.push(sector);
    }

    for (const children of childrenMap.values()) {
      children.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    const result: SectorWithDepth[] = [];
    const traverse = (sector: Sector, depth: number) => {
      result.push({ ...sector, depth });

      const children = childrenMap.get(sector.id) ?? [];
      for (const child of children) {
        traverse(child, depth + 1);
      }
    };

    const roots = childrenMap.get(null) ?? [];
    for (const root of roots) {
      traverse(root, 0);
    }

    return result;
  }
}
