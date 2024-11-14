import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'settings-account',
  templateUrl: './settings-account.component.html'
})
export class SettingsAccountComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required)
  });

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: ['Brian Hughes'],
      username: ['brianh'],
      about: ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
      email: ['hughes.brian@mail.com'],
      phone: ['121-490-33-12'],
      language: ['english']
    });
  }
}
