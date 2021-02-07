import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { OverviewItem, OverviewModel } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget', { static: false }) tapTargetRef: ElementRef<HTMLDivElement>;

  tapTarget: MaterialInstance;
  yesterday: Date = new Date();
  data$: Observable<OverviewModel>;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
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
