import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
}
