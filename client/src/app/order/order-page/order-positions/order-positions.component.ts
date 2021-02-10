import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Position } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';
import { PositionsService } from 'src/app/shared/services/positions.service';

import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getPositions();
  }

  private getPositions(): void {
    this.positions$ = this.activatedRoute.paramMap
      .pipe(
        map((paramMap: ParamMap): string => paramMap.get('id')),
        switchMap((id: string) => {
          return this.positionsService.getPositions(id);
        }),
        map((positions: Position[]): Position[] => {
          return positions.map((position: Position): Position => ({
            ...position,
            quantity: 1
          }))
        })
      );
  }

  canAddPosition(position: Position): boolean {
    return position.quantity && position.quantity > 0;
  }

  addPosition(position: Position): void {
    this.orderService.addPosition(position);
    MaterialService.toast(`Added x${position.quantity} ${position.name}`);
  }


}
