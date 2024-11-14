import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'settings-security',
  templateUrl: './settings-security.component.html'
})
export class SettingsSecurityComponent implements OnInit {
  form: FormGroup = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required)
  });

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      currentPassword: [''],
      newPassword: ['']
    });
  }
}
