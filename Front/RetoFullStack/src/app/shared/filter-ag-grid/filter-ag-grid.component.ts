import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { EditDeleteComponent } from '../ag-grid-render/edit-delete.component';

@Component({
  selector: 'filter-ag-grid',
  templateUrl: './filter-ag-grid.component.html',
  styleUrls: ['./filter-ag-grid.component.scss']
})
export class FilterAgGridComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  columnDefs2 = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];

  rowData2 = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];


  @ViewChild('lbPageSize', { static: false }) elbPageSize: ElementRef | any;
  @ViewChild('lbCurrentPage', { static: true }) elbCurrentPage: ElementRef | any;
  @ViewChild('lbTotalPages', { static: true }) elbTotalPages: ElementRef | any;

  @ViewChild('buttonAgregar', { static: false }) buttonAgregar: ElementRef | any;

  // buttonAgregar: { nativeElement: { getElementsByTagName: (arg0: string) => { focus: () => void; }[]; }; } | undefined;


  /** Ag-Grid */
  @Input() menuActions = true;
  @Input() optionActions = 1;
  @Input() btnAgregar = true;
  @Input() btnAccion = false;
  @Input() btnExportar = false;
  @Input() btnGenerar = false;
  @Input() listaAcciones: any[] = [];
  @Input() pagination = true;
  @Input() rowData: Observable<any[]> = of([]);
  @Input() paginationPageSize = 15;
  @Input() columnDefs: any[] = [];
  @Input() disabledAddRow = false;
  @Input() rowSelection = 'single';

  @Output() endLoadData: EventEmitter<any> = new EventEmitter();

  @Output() onEditRow: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteRow: EventEmitter<any> = new EventEmitter();
  @Output() onAddRow: EventEmitter<any> = new EventEmitter();
  @Output() onExport: EventEmitter<any> = new EventEmitter();
  @Output() onAccion: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onReady: EventEmitter<any> = new EventEmitter();
  @Output() onGenerar: EventEmitter<any> = new EventEmitter();


  @Output() onSelectRow: EventEmitter<any> = new EventEmitter();
  @Output() onDoubleClick: EventEmitter<any> = new EventEmitter();

  isOpenSubmenu = false;
  // accionList = ["ACCION 1","ACCION 2"]
  selectedData: any[] = [];
  @Output() onAnularDevolucion: EventEmitter<any> = new EventEmitter();
  @Output() onDevolverGuia: EventEmitter<any> = new EventEmitter();

  columnDefsActions: any;
  rowDataSubscription: Subscription | undefined;

  txtBuscar = new FormControl('');
  $subscriptiontxtBuscar: Subscription;

  gridApi: any;
  gridColumnApi: any;

  // paginationPageSize = 5;
  domLayout = 'autoHeight';

  defaultColDef = {
    flex: 1,
    wrapText: true,
    resizable: true,
    sortable: true,
    autoHeight: true
  };
  overlayNoRowsTemplate =
    `<span class="ag-overlay-loading-center border-0 bg-transparent shadow-none">
			No se encontraron registros...
			</span>`;
  overlayLoadingTemplate =
    `<span class="ag-overlay-loading-top d-flex align-items-center border-0 bg-white shadow p-4 text-info" style="height: 20px;">
			<img src="assets/media-demo/loading.gif" height="20" width="25" class="mr-2">
			<strong>Cargando registros</strong>
			</span>`;

  /** Declare Component Render Edit- Actions */
  frameworkComponents = {
    editDeleteComponent: EditDeleteComponent,
  };
  context = { componentParent: this };

  /* Paginación */
  pageFound: boolean | any;
  paginas: number[] | any;
  desde: number | any;
  hasta: number | any;

  focus = () => {
    if (this.btnAgregar) {
      this.buttonAgregar.nativeElement.getElementsByTagName("button")[0].focus();
    }
  }


  constructor() {
    this.$subscriptiontxtBuscar = this.txtBuscar.valueChanges.pipe(
      debounceTime(350)
    ).subscribe(data => {
      this.gridApi.setQuickFilter(data);
    });

  }
  ngAfterViewInit(): void {
    // if (this.btnAgregar) {
    // 	this.buttonAgregar.nativeElement.getElementsByTagName("button")[0].focus();;
    // }
  }


  closeDrop(drop: any) {
    drop.close();
  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.gridApi) {
      return;
    }
    if (changes.rowData) {
      // console.log('ag-grid-actions-filter  | ngOnChanges', changes);
      this.initRowData();
    }
  }

  ngOnDestroy() {
    /* No borrar */
  }
  onGridReady(params: any) {

    // this.optionActions
    let cellRenderer = '';
    switch (this.optionActions) {
      case 1:
        cellRenderer = 'editDeleteComponent';
        break;
      case 2:
        cellRenderer = 'agGridColumnGuiasComponent';
        break;
      case 3:
        cellRenderer = 'editButtonComponent';
        break;
      case 4:
        cellRenderer = 'editDeleteServAdicComponent';
        break;
      default:
        cellRenderer = 'editDeleteComponent';
        break;
    }

    this.columnDefsActions = this.columnDefs.concat([{
      headerName: 'Acciones',
      field: '',
      width: 90,
      minWidth: 90,
      cellClass: ['d-flex justify-content-center align-items-center'],
      cellStyle: { overflow: 'visible' },
      resizable: true,
      sortable: false,
      cellRenderer,
      pinned: 'right',
      suppressMenu: true,
      filter: false,
      lockPosition: true
    }]);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.initRowData();
    // this.rowDataSubscription = this.rowData.subscribe(data => {
    // 	this.gridApi.setRowData(data);
    // 	this.autoSizeColumns();
    // });
    this.onReady.emit([this.gridApi, this.gridColumnApi]);
  }
  initRowData() {
    // debugger;
    if (this.rowDataSubscription) {
      this.rowDataSubscription.unsubscribe();
      this.gridApi.setRowData([]);
      this.gridApi.showLoadingOverlay();
    }
    this.rowDataSubscription = this.rowData.subscribe(data => {
      this.gridApi.setRowData(data);
      this.gridApi.sizeColumnsToFit();
      const colIds = this.gridColumnApi
        .getAllDisplayedColumns()
        .map((col: any) => col.getColId());
      this.gridColumnApi.autoSizeColumns(colIds);
      this.endLoadData.emit()
    });
  }
  onColumnResized(params: any) {
    params.api.resetRowHeights();
  }

  onColumnVisible(params: any) {
    params.api.resetRowHeights();
  }
  onRowDataChanged() {
    if (!this.gridApi) {
      return;
    }
    if (!this.gridApi.getDisplayedRowCount()) {
      return;
    }
    this.onChange.emit([this.gridApi, this.gridColumnApi]);
  }
  onRowDataUpdated() {
    if (!this.gridApi) {
      return;
    }
    if (!this.gridApi.getDisplayedRowCount()) {
      return;
    }
    console.log('onRowDataUpdated');
    this.onChange.emit([this.gridApi, this.gridColumnApi]);
  }
  onPaginationChanged() {
    if (!this.gridApi) {
      return;
    }
    if (this.pagination && this.gridApi.paginationGetRowCount() > -1) {
      this.elbPageSize.nativeElement.innerHTML = this.gridApi.paginationGetRowCount();
      this.elbCurrentPage.nativeElement.innerHTML = this.gridApi.paginationGetCurrentPage() + 1;
      this.elbTotalPages.nativeElement.innerHTML = this.gridApi.paginationGetTotalPages();
      // this.elbtLast.nativeElement.setAttribute('disabled', !this.gridApi.paginationIsLastPageFound());
      this.pageFound = this.gridApi.paginationGetTotalPages() < 1;
      this.desde = Math.min(Math.max(1, this.gridApi.paginationGetCurrentPage() - 2), this.gridApi.paginationGetTotalPages() - 2);
      this.hasta = Math.max(Math.min(this.gridApi.paginationGetTotalPages(), this.gridApi.paginationGetCurrentPage() + 2), 5);
      if (this.gridApi.paginationGetTotalPages() > 5) {
        this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
      } else {
        this.paginas = new Array(this.gridApi.paginationGetTotalPages()).fill(0).map((valor, indice) => indice + 1);
      }

    }
  }
  /** begin: Events Buttons de desplazamiento en ag-grid */

  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
    this.autoSizeColumns();
  }
  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
    this.autoSizeColumns();
  }
  onBtNext() {
    this.gridApi.paginationGoToNextPage();
    this.autoSizeColumns();
  }
  onBtLast() {
    this.gridApi.paginationGoToLastPage();
    this.autoSizeColumns();
  }

  onPageSizeChanged(evt: any) {
    this.gridApi.paginationSetPageSize(Number(evt.target.value));
  }
  onGoToPage(page: any) {
    this.gridApi.paginationGoToPage(page);
  }

  /** end: Events Buttons de desplazamiento en ag-grid */

  addRow() {
    this.onAddRow.emit(this.gridApi);
  }
  export() {
    this.onExport.emit();
  }
  methodFromParent_edit(cell: any) {
    const ROWNODE = this.gridApi.getDisplayedRowAtIndex(cell);
    this.onEditRow.emit(ROWNODE);
  }
  methodFromParent_delete(cell: any) {
    const ROWNODE = [];
    ROWNODE.push(this.gridApi.getDisplayedRowAtIndex(cell).data);
    this.onDeleteRow.emit([this.gridApi, ROWNODE]);
  }
  autoSizeColumns() {
    const colIds = this.gridColumnApi
      .getAllDisplayedColumns()
      .map((col: any) => col.getColId());
    this.gridColumnApi.autoSizeColumns(colIds);
  }

  // eventos para seguimiento
  onSelectionChanged(evt: any) {
    this.selectedData = this.gridApi.getSelectedRows();
    this.onSelectRow.emit(this.gridApi.getSelectedRows());
  }


  accion(selectedItem: any) {
    if (selectedItem.accion) {
      this.onAccion.emit([selectedItem, this.selectedData]);
    }
  }

}
