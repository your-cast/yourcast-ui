import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'settings-plan-billing',
  templateUrl: './settings-plan-billing.component.html'
})
export class SettingsPlanBillingComponent implements OnInit {
  plans: any[] = [];
  form: FormGroup = new FormGroup({
    plan: new FormControl('', Validators.required)
  });

  constructor() {
  }

  ngOnInit(): void {
    this.plans = [
      {
        value: 'free',
        label: 'FREE',
        details: 'Starter plan and free forever.',
        price: '0'
      },
      {
        value: 'pro',
        label: 'PRO',
        details: 'Create two or more shows.',
        price: '5'
      },
      {
        value: 'max',
        label: 'MAX',
        details: 'No limits for shows.',
        price: '20'
      }
    ];

    this.form.patchValue({
      plan: ['free']
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
