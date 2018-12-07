import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $(document).foundation();
    });
    $('#offCanvasRight').removeClass('is-open').addClass('is-closed').attr('aria-hidden', 'true');
    $('.js-off-canvas-overlay').removeClass('is-visible is-closable');
  }

}
