import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ng-auction';
}
