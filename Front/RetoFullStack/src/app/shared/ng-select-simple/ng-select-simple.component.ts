import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, EventEmitter, Output, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'ng-select-simple',
  templateUrl: './ng-select-simple.component.html',
  styleUrls: ['./ng-select-simple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelectSimpleComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgSelectSimpleComponent),
      multi: true,
    }
  ]
})
export class NgSelectSimpleComponent implements OnInit, OnChanges {


  @ViewChild('ngSelectSimple', { static: true }) ngSelectSimple: NgSelectComponent | any;

  @Input() backgroundCanal = false;
  @Input() label: any = null;
  @Input() next: any;
  @Input() nextIsDisable: any;
  @Input() back: any;
  @Input() backIsDisable: any;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() validatorMessage: boolean = false;
  @Input() tooltipMessage: boolean = true;
  @Input() openWhenFocus: boolean = false;
  @Input() searchBy: string = "value";
  @Input() markFirstItem: boolean = false;
  @Input() upperCase: boolean = true;

  @Input() appendTo: any = "body"
  @Input() items: Observable<any[]> = of([]);

  @Input() loading: boolean = true;
  @Input() loadingText: string = "Cargando...";


  @Input() markFirst: boolean = true;
  @Input() clearable: boolean = false;
  @Input() virtualScroll: boolean = true;
  @Input() openOnEnter: boolean = false;

  @Output() onNext: EventEmitter<any> = new EventEmitter();
  @Output() onBack: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() onfocus: EventEmitter<any> = new EventEmitter();


  allItems: any[] = [];
  _value: any;
  controls: any;

  onChange = (_: any) => { };

  onValidationChange = () => { };

  onTouched = () => { };


  focus = () => {
    this.ngSelectSimple.focus();
    if (this.openWhenFocus) {
      this.ngSelectSimple.open();
    }

  }

  close = () => {
    this.ngSelectSimple.close();
  }

  constructor(private cdrf: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.loading = true;
      this.items.pipe(finalize(() => {
        this.loading = false;
        this.cdrf.markForCheck();
      })).subscribe((res: any) => {
        this.allItems = res;
        if (this._value != null) {
          res.forEach((element: any) => {
            if (element[this.searchBy] === this._value) {
              this._value = element;
              this.onChange(this._value);
            }
          });
        } else {
          if (this.markFirstItem && res.length > 0) {
            this._value = res[0];
            this.onChange(this._value);
          }
        }
        this.cdrf.markForCheck();
      })
    }
  }


  ngOnInit() {
  }

  writeValue(value: any): void {
    if (value != null) {
      if (this.loading) {
        this._value = value;
      } else {
        this._value = value;
        this.allItems.forEach(element => {
          if (element[this.searchBy] === this._value) {
            this._value = element;
            this.onChange(this._value);
          }
        });
      }

      //this.searchElement(value);
      this.onValidationChange();
    } else {
      this._value = null;
      this.onValidationChange();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): any {
    this.controls = control;
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  eventChange(e: any) {
    this.onChange(e);
    this.onValidationChange();
    this.change.emit(e);
  }

  eventBlur(e: any) {
    this.onTouched();
    this.onValidationChange();
    this.blur.emit(e);

  }

  eventFocus(e: any) {
    // this.ngSelectSimple.focus();
    if (this.openWhenFocus) {
      this.ngSelectSimple.open();
    }
    this.onfocus.emit(e);
  }

  enterKeyUp() {
    this.ngSelectSimple.close();
    if (this.next != undefined) {
      if (this.next.disabled || this.next.readonly) {
        if (this.nextIsDisable != undefined) {
          this.nextIsDisable.focus();
        }
      } else {
        this.next.focus();
      }
    } else {
      if (this.nextIsDisable != undefined) {
        this.nextIsDisable.focus();
      } else {
        this.onNext.emit();
      }
    }
  }

  leftKeyUp() {
    this.ngSelectSimple.close();
    if (this.back != undefined) {
      if (this.back.disabled || this.back.readonly) {
        if (this.backIsDisable != undefined) {
          this.backIsDisable.focus();
        }
      } else {
        this.back.focus();
      }
    } else {
      if (this.backIsDisable != undefined) {
        this.backIsDisable.focus();
      } else {
        this.onBack.emit();
      }
    }
  }

  clear() {
    this.onChange(null);
    this.onValidationChange();
    this.change.emit(null);
  }

}
