import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
	selector: 'edit-delete',
	template: `
	<div class="d-flex justify-content-center">
        <button (click)="invokeParentMethod_edit()" type="button" class="btn btn-transparent px-2 py-0" matTooltip="Modificar" matTooltipClass="bg-warning"><i class="fa fa-pen text-warning p-0" ></i></button>
		<button (click)="invokeParentMethod_delete()" type="button" class="btn btn-transparent px-2 py-0" matTooltip="Eliminar" matTooltipClass="bg-danger"><i class="fa fa-trash text-danger p-0"></i></button>
	</div>
	`,
	styles: []
})
export class EditDeleteComponent implements ICellRendererAngularComp {

	constructor() { }

	public params: any;
	agInit(params: any): void {
		this.params = params;
	}
	refresh(params: any): boolean {
		// throw new Error("Method not implemented.");
		return false;
	}
	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		// throw new Error("Method not implemented.");
	}

	public invokeParentMethod_edit() {
		this.params.context.componentParent.methodFromParent_edit(`${this.params.node.rowIndex}`);
	}

	public invokeParentMethod_delete() {
		this.params.context.componentParent.methodFromParent_delete(`${this.params.node.rowIndex}`);
	}
}
