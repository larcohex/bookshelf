import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>('https://fakerestapi.azurewebsites.net/api/Books')
      .pipe(map((books) => books.map((book) => ({ ...book, PublishDate: new Date(book.PublishDate) }))));
  }

  getBookAuthors(id: number): Observable<Author[]> {
    return this.http.get<Author[]>(`https://fakerestapi.azurewebsites.net/authors/books/${id}`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`https://fakerestapi.azurewebsites.net/api/Books/${id}`);
  }
}
