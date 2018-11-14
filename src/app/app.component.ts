
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'foundation-sites';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'toyoExpress';
  ngOnInit () {
    $(document).ready(() => {
      $('#foundationVersion').html(Foundation.version);
    });
  }
}
