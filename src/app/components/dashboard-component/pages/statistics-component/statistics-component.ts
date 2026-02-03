import { Component, inject, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { UpperCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { StatisticsService, StatististicElement } from '../../../../services/statistics-service';

@Component({
  selector: 'app-statistics-component',
  imports: [MatTableModule, UpperCasePipe, CurrencyPipe],
  templateUrl: './statistics-component.html',
  styleUrl: './statistics-component.css',
})
export class StatisticsComponent implements OnInit {
  private statsService = inject(StatisticsService);

  displayedColumns: string[] = ['month', 'quantity', 'total_sold'];
  dataSource: StatististicElement[] = [];

  ngOnInit(): void {
    this.statsService.fetchStatistics().subscribe((data) => {
      if (Array.isArray(data) && data.length) {
        this.dataSource = data;
      } else {
        this.dataSource = [];
      }
    }, () => {
      this.dataSource = [];
    });
  }

}
