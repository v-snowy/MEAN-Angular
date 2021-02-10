import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryAccountService } from '../../shared/services/summary-account.service';
import { OverviewItem, OverviewModel } from '../../shared/interfaces';
import { MaterialInstance, MaterialService } from '../../shared/services/material.service';
import { LoadingValue } from 'src/app/store/shared/loading-value';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget', { static: false }) tapTargetRef: ElementRef<HTMLDivElement>;

  private tapTarget: MaterialInstance;

  get overview$(): Observable<LoadingValue<OverviewModel>> {
    return this.summaryAccountService.overview$;
  }

  get yesterday(): number {
    const _yesterday: Date = new Date();
    return _yesterday.setDate(_yesterday.getDate() - 1);
  }

  constructor(
    private summaryAccountService: SummaryAccountService
  ) { }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  ngOnInit(): void {
    this.summaryAccountService.loadOverview();
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  openInfo(): void {
    this.tapTarget.open();
  }

  getOverviewInformation(data: OverviewItem, index: 'Gain' | 'Orders'): string {
    return `
      ${index === 'Gain' ? index : `${index} count`} for yesterday on ${data.percent}%
      ${data.isHigher ? 'higher' : 'lower'} Shan average: ${data.compare}${index === 'Gain' ? '$' : ' orders'} on day.
    `;
  }
}
