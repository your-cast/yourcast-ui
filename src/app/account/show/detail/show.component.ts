import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShowService} from '../../../common/services/show.service';

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
    private showService: ShowService
  ) {
  }

  ngOnInit(): void {
    this.showId = this.activatedRoute.snapshot.paramMap.get('id');
    this.showService.getShowInfo(this.showId).subscribe(response => {
      this.show = response.result;
    });
  }
}
