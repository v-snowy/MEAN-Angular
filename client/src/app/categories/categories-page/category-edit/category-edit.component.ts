import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.sass'],
  providers: [
    CategoriesService
  ]
})
export class CategoryEditComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInputRef: ElementRef<HTMLInputElement>;

  isEdit = false;
  image: File;
  imagePreview = '';
  category: Category;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params
      .pipe(
        take(1),
        switchMap((params: Params) => {
          if (params['id']) {
            this.isEdit = true;
            return this.categoriesService.getCategoryById(params['id']);
          }
          return of(undefined);
        }))
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({ name: category.name });
            this.imagePreview = category.imageSrc;
            MaterialService.updateTextFields();
          }
          this.form.enable();
        },
        error => {
          this.form.enable();
          MaterialService.toast(error.error.message);
        }
      )
  }

  isControlInvalid(controlName: string) {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
  }

  selectFile() {
    this.fileInputRef.nativeElement.click();
  }

  fileUpload(event: Event) {
    const file = event.target['files'][0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.form.disable();
    let obs$: Observable<Category>;
    const name = this.form.value.name;

    if (this.isEdit) {
      obs$ = this.categoriesService.updateCategory(this.category._id, name, this.image);
    } else {
      obs$ = this.categoriesService.createCategory(name, this.image);
    }

    obs$
      .pipe(take(1))
      .subscribe((category: Category) => {
        this.category = category;
        MaterialService.toast('Category has been saved successful');
        this.form.enable();
      },
      error => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      })
  }

  deleteCategory() {
    this.form.disable();
    this.categoriesService.deleteCategory(this.category._id)
      .pipe(take(1))
      .subscribe(
        () => {
          MaterialService.toast(`Category "${this.category.name}" has been removed`);
          this.form.enable();
        },
        error => {
          this.form.enable();
          MaterialService.toast(error.error.message);
        },
        () => this.router.navigate(['/categories'])
      )
  }
}
