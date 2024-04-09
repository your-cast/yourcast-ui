import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShowService} from '../../common/services/show.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showSpinner: boolean;
  shows: any;
  episodes: any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    private showService: ShowService,
    private router: Router
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.showService.showList().subscribe(response => {
      this.shows = response.result;
    });
  }

  handleMoveToEpisodeDetail(id: string): void {
    this.router.navigate(['/episode/detail/' + id]);
  }

  handleMoveToShowDetail(id: string): void {
    this.router.navigate(['/show/detail/' + id]);
  }

  handleCreateNewShow(): void {
    this.router.navigate(['/welcome']);
  }
}
