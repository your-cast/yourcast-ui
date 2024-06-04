import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../../shared/services/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  showId: string | null = null;
  show: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private showService: ShowService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.showId = this.activatedRoute.snapshot.paramMap.get('id');
    this.showService.getShowInfo(this.showId).subscribe(response => {
      this.show = response.result;
    });
  }

  handleMoveToEpisodeCreate(id: string): void {
    this.router.navigate(['/episode/create/' + id]);
  }
}
