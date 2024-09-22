import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/services-pages.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    readonly apiUrl = `${environment.apiUrl}`; // Tam URL'yi belirtiyoruz

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}Categories`).pipe(
            map((data: Category[]) => data.map(item => ({
                categoryId: item.categoryId, // item.categoryId yerine item.categoryID
                categoryName: item.categoryName,
                description: item.description
            })))
        );
    }
}
