import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Filter, Order } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/services/material.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

const STEP: number = 3;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tooltip', { static: false }) tooltipRef: ElementRef<HTMLButtonElement>;

  tooltip: MaterialInstance;
  isFilterVisible: boolean = false;
  private filter: Filter = {};

  offset: number = 0;
  limit: number = STEP;
  ordersList: Order[] = [];
  loading: boolean = false;
  reloading: boolean;
  noMoreOrders: boolean = false;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.reloading = true;
    this.getAllOrders();
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  toggleFilters(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  loadMoreOrders(): void {
    this.loading = true;
    this.offset += STEP;
    this.getAllOrders();
  }

  applyFilter(filter: Filter): void {
    this.ordersList = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.getAllOrders();
  }

  isFiltered(): boolean {
    return  Object.keys(this.filter).length > 0;
  }

  private getAllOrders(): void {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.ordersService.getAllOrders(params)
      .pipe(take(1))
      .subscribe((orders: Order[]) => {
        this.noMoreOrders = orders.length < STEP;
        this.ordersList = this.ordersList.concat(orders);
        this.loading = false;
        this.reloading = false;
      });
  }
}
