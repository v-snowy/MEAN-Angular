import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.sass'],
  providers: [
    CategoriesService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
  }

}
