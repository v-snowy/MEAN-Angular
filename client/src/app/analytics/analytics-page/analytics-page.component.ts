import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { AnalyticsChartItem, AnalyticsModel } from '../../shared/interfaces';
import { SummaryAccountService } from '../../shared/services/summary-account.service';
import { LoadingValue } from 'src/app/store/shared/loading-value';
import { untilDestroyed } from 'ngx-take-until-destroy';

interface ChartConfig {
  label: 'Gain' | 'Orders';
  color: string;
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gain', { static:  false}) gainRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('orders', { static:  false}) ordersRef: ElementRef<HTMLCanvasElement>;

  get analytics$(): Observable<LoadingValue<AnalyticsModel>> {
    return this.summaryAccountService.analytics$;
  }

  private readonly gainConfig: ChartConfig = {
    label: 'Gain',
    color: 'rgb(255, 99, 132)',
    labels: [],
    data: []
  };
  private readonly ordersConfig: ChartConfig = {
    label: 'Orders',
    color: 'rgb(54, 162, 235)',
    labels: [],
    data: []
  };

  constructor(
    private summaryAccountService: SummaryAccountService
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.summaryAccountService.loadAnalytics();
  }

  ngAfterViewInit(): void {
    this.drawAnalyticsCharts();
  }

  private drawAnalyticsCharts(): void {
    this.analytics$
      .pipe(
        untilDestroyed(this),
        filter(({ value }: LoadingValue<AnalyticsModel>) => !!value),
        take(1)
      )
      .subscribe(({ value: data }: LoadingValue<AnalyticsModel>) => {
        this.drawChart(this.gainConfig, data, this.gainRef);
        this.drawChart(this.ordersConfig, data, this.ordersRef);
      })
  }

  private drawChart(config: ChartConfig, data: AnalyticsModel, ref: ElementRef<HTMLCanvasElement>): void {
    config.labels = data.chart.map((item: AnalyticsChartItem): string => item.label);
    config.data = data.chart.map((item: AnalyticsChartItem): number => {
      return config.label === 'Gain' ? item.gain : item.order;
    });

    const ctx = ref.nativeElement.getContext('2d');
    ctx.canvas.height = 60;

    new Chart(ctx, createChartConfig(config));
  }
}

function createChartConfig({ labels, data, label, color }: ChartConfig): any {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
