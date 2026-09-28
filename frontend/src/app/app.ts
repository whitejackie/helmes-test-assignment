import { Component, computed, inject, signal } from '@angular/core';
import { Sector } from './interfaces/sector';
import { SectorsService } from './services/sectors.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from './services/users.service';

interface SectorWithDepth extends Sector {
  depth: number;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private sectorsService = inject(SectorsService);
  private usersService = inject(UsersService);
  private sectors = toSignal(this.sectorsService.getSectors(), { initialValue: [] as Sector[] });
  private fb = inject(FormBuilder);
  protected currentUserId = signal<number | null | undefined>(null);

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

  form = this.fb.group({
    name: ['', Validators.required],
    sectors: [[] as number[], Validators.required],
    agree: [false, Validators.requiredTrue],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const payload = {
      name: raw.name ?? '',
      sectors: raw.sectors ?? [],
      agree: raw.agree ?? false,
    };

    const request = this.currentUserId()
      ? this.usersService.updateForm(this.currentUserId()!, payload)
      : this.usersService.submitForm(payload);

    request.subscribe({
      next: (savedUser) => {
        this.currentUserId.set(savedUser.id ?? null);
        console.log(savedUser);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
