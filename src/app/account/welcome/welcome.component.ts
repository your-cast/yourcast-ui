import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  handleMoveCreateNewShow(): void {
    this.router.navigate(['/show/create']);
  }

  handleMoveImportNewShow(): void {
    this.router.navigate(['/show/import']);
  }
}
