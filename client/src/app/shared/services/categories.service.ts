import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category, Message } from '../interfaces';

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) { }
y
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`/api/category`);
  }

  getCategoryById(id: string): Observable<Category> {
    if (!id) { return; }
    return this.http.get<Category>(`/api/category/${id}`);
  }

  createCategory(name: string, img?: File): Observable<Category> {
    if (!name) { return; }

    const fd = new FormData();
    fd.append('name', name);
    if (img) {
      fd.append('image', img, img.name);
    }

    return this.http.post<Category>(`/api/category`, fd);
  }

  updateCategory(id: string, name: string, img?: File): Observable<Category> {
    if (!id || !name) { return; }
    
    const fd = new FormData();
    fd.append('name', name);
    if (img) {
      fd.append('image', img, img.name);
    }

    return this.http.patch<Category>(`/api/category/${id}`, fd);
  }

  deleteCategory(id: string): Observable<Message> {
    if (!id) { return; }
    return this.http.delete<Message>(`/api/category/${id}`);
  }
}