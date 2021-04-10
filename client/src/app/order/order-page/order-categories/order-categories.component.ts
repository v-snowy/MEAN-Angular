import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.sass'],
  // providers: [
  //   CategoriesService
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
  }

  constructCategoryLink(id: string) {
    return `/order/${id}`;
  }
}


