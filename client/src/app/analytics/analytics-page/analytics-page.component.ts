import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { AnalyticsChartItem, AnalyticsModel } from '../../shared/interfaces';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Chart } from 'chart.js';

interface ChartConfig {
  label: 'Gain' | 'Orders';
  color: string;
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.sass']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit {

  @ViewChild('gain', { static:  false}) gainRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('orders', { static:  false}) ordersRef: ElementRef<HTMLCanvasElement>;

  average: number;
  pending: boolean = true;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const gainConfig: ChartConfig = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
      labels: [],
      data: []
    };

    const ordersConfig: ChartConfig = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)',
      labels: [],
      data: []
    };

    this.analyticsService.getAnalytics()
      .pipe(
        take(1)
      )
      .subscribe((data: AnalyticsModel) => {
        this.average = data.average;
        this.drawChart(gainConfig, data, this.gainRef);
        this.drawChart(ordersConfig, data, this.ordersRef);

        this.pending = false;
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
