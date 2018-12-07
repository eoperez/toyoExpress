import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $(document).foundation();
    });
    $('#offCanvasRight').removeClass('is-open').addClass('is-closed').attr('aria-hidden', 'true');
    $('.js-off-canvas-overlay').removeClass('is-visible is-closable');
  }

}
