import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { Position } from 'src/app/shared/interfaces'
import { MaterialService, MaterialInstance } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.sass'],
  providers: [
    PositionsService
  ]
})
export class PositionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal', { static: false }) modalRef: ElementRef<HTMLDivElement>;

  positions: Position[] = [];
  loading: boolean = false;
  modal: MaterialInstance;
  form: FormGroup;
  minCost = 1;
  positionId = null;

  constructor(private positionsService: PositionsService) { }

  ngOnInit(): void {
    this.initPositions();
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  private initPositions() {
    this.loading = true;
    this.positionsService.getPositions(this.categoryId)
      .subscribe(
        positions => {
          this.positions = positions;
          this.loading = false;
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(this.minCost)])
    })
  }

  positionHandler(position?: Position): void {
    if (position) {
      this.positionId = position._id;
      this.form.patchValue({ name: position.name, cost: position.cost });
    } else {
      this.positionId = null;
      this.form.reset();
    }
    this.modal.open();
    MaterialService.updateTextFields();
  }

  closeModal() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();
    const position: Position = {...this.form.value, category: this.categoryId};

    if (this.positionId) {
      position._id = this.positionId;
      this.updatePosition(position);
    } else {
      this.createPosition(position);
    }
  }

  private createPosition(position: Position) {
    this.positionsService.createPosition(position)
    .pipe(take(1))
    .subscribe(
      (position: Position) => {
        this.positions.push(position);
        this.modal.close();
        this.form.enable();
        MaterialService.toast(`Position "${position.name}" has been added`);
      },
      error => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      }
    )
  }

  private updatePosition(position: Position) {
    this.positionsService.updatePosition(position)
    .pipe(take(1))
    .subscribe(
      (position: Position) => {
        const idx = this.positions.findIndex(x => x._id === position._id);
        this.positions[idx] = position;
        this.modal.close();
        this.form.enable();
        MaterialService.toast(`Position "${position.name}" has been changed`);
      },
      error => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      }
    )
  }

  deletePosition(event: Event, position: Position) {
    event.stopPropagation();
    this.positionsService.deletePosition(position._id)
    .pipe(take(1))
    .subscribe(
      () => {
        const idx = this.positions.findIndex(x => x._id === position._id);
        this.positions.splice(idx, 1);
        MaterialService.toast(`Position "${position.name}" has been removed`);
      },
      error => MaterialService.toast(error.error.message)
    )
  }

  isControlInvalid(controlName: string) {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

}
