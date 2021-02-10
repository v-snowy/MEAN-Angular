import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Order, OrderPosition } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/services/material.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
  providers: [
    OrderService,
    PositionsService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal', { static: false }) modalRef: ElementRef<HTMLDivElement>;

  modal: MaterialInstance;
  isRoot: boolean;
  pending: boolean = false;

  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService
  ) { }

  canSubmitOrder(): boolean {
    return this.order.positionsList.length > 0 && !this.pending;
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events
      .pipe(untilDestroyed(this))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isRoot = this.router.url === '/order';
        }
      });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  openSubmitOrder(): void {
    this.modal.open();
  }

  closeSubmitOrder(): void {
    this.closeModalDialog();
  }

  submitOrder(): void {
    this.pending = true;

    const order: Order = {
      list: this.order.positionsList.map((order: OrderPosition) => {
        delete order._id;
        return order;
      })
    };
    this.ordersService.create(order)
      .pipe(untilDestroyed(this))
      .subscribe(
        (newOrder: Order) => {
          MaterialService.toast(`Order №${newOrder.order} has been added.`);
          this.order.clear();
        },
        error => MaterialService.toast(error.error.message),
        () => {
          this.pending = false;
          this.closeModalDialog();
        }
      );

  }

  removePosition(position: OrderPosition): void {
    this.order.removePosition(position);
  }

  private closeModalDialog(): void {
    this.modal.close();
  }
}
