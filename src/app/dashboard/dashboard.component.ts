import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import format from 'date-fns/format';
import sampleSize from 'lodash-es/sampleSize';
import { BooksService } from '../shared/books/books.service';
import { Book } from '../shared/books/book';
import { Author } from '../shared/books/author';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  authors: Author[][] = [];
  areAuthorsVisible = false;
  init = false;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe((books) => {
      this.books = sampleSize(books, 4);
      const requests: Observable<Author[]>[] = [];
      for (let i = 0; i < this.books.length; ++i) {
        requests.push(this.booksService.getBookAuthors(this.books[i].ID));
      }
      forkJoin(requests).subscribe((authors) => {
        this.authors = authors;
        this.init = true;
      });
    });
  }

  format(date, formatString) {
    return format(date, formatString);
  }

  toggleAuthors(event: MouseEvent) {
    event.stopPropagation();
    this.areAuthorsVisible = !this.areAuthorsVisible;
  }

  getAuthors(index: number): string {
    return this.authors[index].map((author) => `${author.FirstName} ${author.LastName}`).join(', ');
  }
}
