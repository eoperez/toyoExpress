import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $(document).foundation();
    });
    $('#offCanvasRight').removeClass('is-open').addClass('is-closed').attr('aria-hidden', 'true');
    $('.js-off-canvas-overlay').removeClass('is-visible is-closable');
  }

}
