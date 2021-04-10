import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { LoadingArray } from 'src/app/store/shared/loading-array';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit {

  get categories$(): Observable<LoadingArray<Category>> {
    return this.categoriesService.categories$;
  };

  constructor(
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.loadCategories();
  }

  trackByFn(index: number, item: Category): number {
    return index;
  }
}
