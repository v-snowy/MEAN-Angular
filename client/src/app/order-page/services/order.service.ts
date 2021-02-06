import { Injectable } from '@angular/core';

import { OrderPosition, Position } from 'src/app/shared/interfaces';

@Injectable()
export class OrderService {

  positionsList: OrderPosition[] = [];
  totalPrice: number = 0;

  private calculateTotalPrice(): void {
    this.totalPrice = this.positionsList.reduce((acc, pos) => acc += pos.quantity * pos.cost, 0);
  }

  addPosition(position: Position): void {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    const candidate: OrderPosition = this.positionsList.find(
      (position: OrderPosition) => position._id === orderPosition._id
    );

    if (candidate) {
      candidate.quantity += position.quantity;
    } else {
      this.positionsList.push(orderPosition);
    }

    this.calculateTotalPrice();
  }

  removePosition(orderPosition: OrderPosition): void {
    const idx: number = this.positionsList
      .findIndex(
        (position: OrderPosition) => position._id === orderPosition._id
      );

    this.positionsList.splice(idx, 1);
    this.calculateTotalPrice();
  }

  clear(): void {
    this.positionsList = [];
    this.totalPrice = 0;
  }
}
