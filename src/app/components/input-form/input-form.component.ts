import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Input() nores: boolean;
  @Output() searchEbay: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  SOrder: any = [
    {name: "Best Match", value: "BestMatch"},
    {name: "Price: highest first", value: "CurrentPriceHighest"},
    {name: "Price + Shipping: highest first", value: "PricePlusShippingHighest"},
    {name: "Price + Shipping: lowest first", value: "PricePlusShippingLowest"}
  ]

  searchForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keywords: ['', Validators.required],
      prange: this.fb.group({
        minprice: [''],
        maxprice: ['']
      }),
      condition: this.fb.group({
        new: [''],
        used: [''],
        vgood: [''],
        good: [''],
        acceptable: ['']
      }),
      seller: this.fb.group({
        ret_accepted: ['']
      }),
      shipping: this.fb.group({
        free: [''],
        expedited: ['']
      }),
      sortorder: [this.SOrder[0]['value']]
    });
    this.searchForm.setValidators(this.priceValidator());
  }

  public priceValidator() : ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const min = group.get('prange.minprice');
      const max = group.get('prange.maxprice');
      if ((parseFloat(min.value) < 0) || (parseFloat(max.value) < 0)) {
        max.setErrors({negative: true});
      } else if(parseFloat(min.value) > parseFloat(max.value)) {
        max.setErrors({minmaxerror: true});
      } else {
        max.setErrors(null);
      }
      return;
    };
 }

  onSubmit(): void {
    this.submitted = true;
    if(this.searchForm.valid) {
      const fdata = {
        keywords: this.searchForm.get('keywords').value,
        sortOrder: this.searchForm.get('sortorder').value,
        MinPrice: this.searchForm.get('prange.minprice').value,
        MaxPrice: this.searchForm.get('prange.maxprice').value,
        prange: (this.searchForm.get('prange.minprice').value || this.searchForm.get('prange.maxprice').value) ? true : false,
        ReturnsAcceptedOnly: this.searchForm.get('seller.ret_accepted').value,
        FreeShippingOnly: this.searchForm.get('shipping.free').value,
        ExpeditedShippingType: this.searchForm.get('shipping.expedited').value ? 'Expedited' : '',
        Condition: (this.searchForm.get('condition.new').value || this.searchForm.get('condition.used').value || this.searchForm.get('condition.vgood').value || this.searchForm.get('condition.good').value || this.searchForm.get('condition.acceptable').value) ? true : false,
        cond_new: this.searchForm.get('condition.new').value ? '1000' : '',
        cond_used: this.searchForm.get('condition.used').value ? '3000' : '',
        cond_vgood: this.searchForm.get('condition.vgood').value ? '4000' : '',
        cond_good: this.searchForm.get('condition.good').value ? '5000' : '',
        cond_acceptable: this.searchForm.get('condition.acceptable').value ? '6000' : ''
      }
      this.searchEbay.emit(fdata);
      this.submitted = false;
    }
  }

  onClear(formDirective: FormGroupDirective): void {
    this.submitted = false;
    formDirective.resetForm();
    this.searchForm.reset();
    this.clear.emit();
  }

}
