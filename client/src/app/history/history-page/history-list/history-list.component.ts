import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {

  @ViewChild('modal', { static: false }) modalRef: ElementRef<HTMLDivElement>;
  @Input() orders: Order[];

  modal: MaterialInstance;
  selectedOrder: Order;

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  calculateTotalPrice(order: Order): number {
    return order.list.reduce((acc, pos) => acc += pos.quantity * pos.cost, 0);
  }

  openOrderDetails(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeOrderDetails() {
    this.modal.close();
  }
}
