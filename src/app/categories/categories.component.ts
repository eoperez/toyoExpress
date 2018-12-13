import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { BackEndService } from './../back-end.service';
import { ColumnsDef, DatatableComponent } from '../datatable/datatable.component';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ResultMessage {
  show: boolean;
  type: string;
  text: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  @ViewChild(DatatableComponent) datatableComponent;
  action: string;
  @ViewChild('categoryForm') categoryForm: NgForm;
  dataSet: Array<Category> = [];
  resultMessage: ResultMessage = {
    show: false,
    type: null,
    text: null
  };
  columnsDef: Array<ColumnsDef> = [
    {id: 'id', name: 'Id'},
    {id: 'name', name: 'Name'},
    {id: 'description', name: 'Description'},
    {id: 'created_at', name: 'Created'},
    {id: 'updated_at', name: 'Updated'},
  ];
  columnsToDisplay: string[] = ['select', 'id', 'name', 'description', 'created_at', 'actions'];
  confirmDelete: FoundationSites.Reveal;
  saveReveal: FoundationSites.Reveal;
  resultsCallout: FoundationSites.Toggler;
  itemsDelete: Array<any> = [];
  category: Category;
  constructor(private _backEndService: BackEndService, private _ngZone: NgZone) {
    this.resetCategory();
  }
  resetCategory() {
    this.category = {
      id: null,
      name: null,
      description: null,
      created_at: null,
      updated_at: null
    };
    this.action = 'Insert';
  }
  delete() {
    console.log('CategoriesComponent:delete:itemsDelete:', this.itemsDelete);
    let deleteList = [];
    this.itemsDelete.forEach(item => {
      deleteList.push(item.id);
    });
    console.log('CategoriesComponent:getSelectedRows:datatableComponent:deleteList:', deleteList);
    const response = this._backEndService.categorySync({action: 'delete', record: deleteList});
    if (response instanceof Error) {
      this.resultMessage = {
        show: null,
        type: 'alert',
        text: response.message
      };
    } else {
      this.resultMessage = {
        show: null,
        type: 'success',
        text: response.message
      };
    }
    deleteList = [];
    this.itemsDelete = [];
    this.datatableComponent.selection.clear();
    this.getCategories();
    this.resultsCallout.toggle();
    this.confirmDelete.close();
    setTimeout(() => {
      this.resultsCallout.toggle();
    }, 5000);
  }
  deleteConfirmation(row) {
    if (typeof row !== 'undefined' ) {
      console.log('row', row);
      this.itemsDelete = [row];
    } else {
      this.itemsDelete = this.datatableComponent.selection.selected;
    }
    this.confirmDelete.open();
  }
  getCategories() {
    this._backEndService.category({action: 'get', record: null}, (error, results) => {
      console.log('CategoriesComponent:getCategory:backendService:action:get', results.message);
      this.dataSet = results.message;
      this.datatableComponent.dataSet = this.dataSet;
      this.datatableComponent.refreshDatatable();
    });
  }
  save() {
    console.log('CategoriesComponent:save:category', this.category);
    if (this.category.id == null) {
      // is action is insert
      this.action = 'insert';
    } else {
      this.action = 'edit';
    }
    const response = this._backEndService.categorySync({action: this.action, record: this.category});
    console.log('CategoriesComponent:save:response: ', response);
    if (response instanceof Error) {
      this.resultMessage = {
        show: null,
        type: 'alert',
        text: response.message
      };
    } else {
      this.resultMessage = {
        show: null,
        type: 'success',
        text: response.message
      };
    }
    this.resultsCallout.toggle();
    this.getCategories();
    this.saveReveal.close();
    this.categoryForm.reset();
    setTimeout(() => {
      this.resultsCallout.toggle();
    }, 5000);
  }
  edit(row) {
    console.log('CategoriesComponent:edit:row:', row);
    this._ngZone.run(() => {
      this.category = row;
    });
    this.action = 'Edit';
    this.saveReveal.open();
  }
  ngOnInit() {
    this.getCategories();
    this.confirmDelete = new Foundation.Reveal($('#confirmDelete'));
    this.saveReveal = new Foundation.Reveal($('#save'));
    this.resultsCallout = new Foundation.Toggler($('#resultsCallout'));
    $(document).ready(() => {
      $(document).foundation();
    });
    $('#save').on('closed.zf.reveal', () => {
      this.categoryForm.reset();
    });
    $('#offCanvasRight').removeClass('is-open').addClass('is-closed').attr('aria-hidden', 'true');
    $('.js-off-canvas-overlay').removeClass('is-visible is-closable');
  }
}
