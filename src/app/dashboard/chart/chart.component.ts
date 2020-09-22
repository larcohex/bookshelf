import { AfterViewInit, Component, Input } from '@angular/core';
import Chart from 'chart.js';
import format from 'date-fns/format';
import groupBy from 'lodash-es/groupBy';
import mapValues from 'lodash-es/mapValues';
import reduce from 'lodash-es/reduce';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() books: any;

  chart: Chart;

  ngAfterViewInit() {
    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Кол. страниц'
          }
        ]
      },
      options: {
        responsive: true
      }
    });
    this.updateChart('month');
  }

  updateChart(mode: string) {
    let formatString: string;
    switch (mode) {
      case 'month':
        formatString = 'MM.yyyy';
        break;
      case 'year':
        formatString = 'yyyy';
        break;
      default:
        formatString = 'MM.yyyy';
        break;
    }
    const pageCounts = mapValues(
      groupBy(this.books, (value) => format(value.PublishDate, formatString)),
      (value) => reduce(value, (sum, book) => sum + book.PageCount, 0) / value.length
    );
    const labels = Object.keys(pageCounts).sort();
    const data = labels.map((label) => pageCounts[label]);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  showByMonths() {
    this.updateChart('month');
  }

  showByYears() {
    this.updateChart('year');
  }
}
