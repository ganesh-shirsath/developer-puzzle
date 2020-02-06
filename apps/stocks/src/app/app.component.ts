import { Component } from '@angular/core';
import { APP_CONST } from 'apps/stocks/src/app/constants/app.const';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: String = APP_CONST.TITLE;
  public welComeMsg = APP_CONST.GREETING_MSG;
}
