import { Component, OnInit, Input, ViewChild, Output, EventEmitter, NgZone} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { tap } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
export interface ColumnsDef {
  id: string;
  name: string;
}
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() dataSet: any;
  @Input() columnsDef: Array<ColumnsDef>;
  @Input() columnsToDisplay: string[];
  @Output() emitEdit = new EventEmitter<any>();
  @Output() emitDelete = new EventEmitter<any>();
  dataSource = new MatTableDataSource<Element[]>(this.dataSet);
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) dataTable: MatTable<any>;
  constructor(private _ngZone: NgZone) { }
  refreshDatatable() {
    console.log('datatable.component:refreshDatatable', this.dataSet);
    this.dataSource.data = this.dataSet;
  }
  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(rowSelected => this.selection.select(rowSelected));
  }

  // Send edit event to parrent
  sendEdit(row) {
    console.log('datatable.component:sendEdit:', row);
    this.selection.toggle(row);
    this.emitEdit.emit(row);
    this.selection.clear();
  }

  // Send delete event to parrent
  sendDelete(row) {
    console.log('datatable.component:sendDelete:', row);
    this.selection.toggle(row);
    this.emitDelete.emit(row);
    this.selection.clear();
  }

  // OnInit
  ngOnInit() {
    this.refreshDatatable();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('datatable.component:ngOnInit:dataSource:', this.dataSource);
    console.log('datatable.component:ngOnInit:columnsDef:', this.columnsDef);
    console.log('datatable.component:ngOnInit:columnsToDisplay:', this.columnsToDisplay);
    console.log('datatable.component:ngOnInit:dataSet:', this.dataSet);
  }
}
