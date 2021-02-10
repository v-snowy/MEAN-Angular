import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter: EventEmitter<Filter> = new EventEmitter<Filter>();
  @ViewChild('startDate', { static: false }) startDateRef: ElementRef<HTMLInputElement>;
  @ViewChild('endDate', { static: false }) endDateRef: ElementRef<HTMLInputElement>;

  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValid: boolean = true;

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(this.startDateRef, this.validateDatepicker.bind(this));
    this.end = MaterialService.initDatepicker(this.endDateRef, this.validateDatepicker.bind(this));
  }

  applyFilter(): void {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }

  private validateDatepicker(): void {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }
}
