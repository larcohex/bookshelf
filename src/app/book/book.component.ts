import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import format from 'date-fns/format';
import { BooksService } from '../shared/books/books.service';
import { Book } from '../shared/books/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  book: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {
    this.route.paramMap.pipe(switchMap((params) => this.booksService.getBook(parseInt(params.get('id'))))).subscribe((book) => (this.book = book));
  }

  format(date, formatString) {
    return format(date, formatString);
  }
}
