import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $(document).foundation();
    });
    $('#offCanvasRight').removeClass('is-open').addClass('is-closed').attr('aria-hidden', 'true');
    $('.js-off-canvas-overlay').removeClass('is-visible is-closable');
  }

}
