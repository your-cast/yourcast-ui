import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {EpisodesService} from '../../../../shared/services/episodes.service';

@Component({
  selector: 'app-show-episodes',
  templateUrl: './show-episodes.component.html',
  styleUrls: ['./show-episodes.component.scss']
})
export class ShowEpisodesComponent implements OnInit {
  @Input()
  show: any = null;

  episodes: any = [];
  displayedColumns: string[] = ['id', 'artwork', 'title', 'season', 'episode', 'status', 'created', 'actions'];
  page: number = 1;

  constructor(
    private router: Router,
    private episodesService: EpisodesService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.episodesService.showEpisodesList(this.show.id, this.page).subscribe(response => {
      this.episodes = response.result;
    });
  }

  handleMoveToEpisodeDetail(id: string): void {
    this.router.navigate(['/episode/detail/' + id]);
  }

  handlePageBottom(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.episodesService.showEpisodesList(this.show.id, this.page).subscribe(response => {
      this.episodes = response.result;
    });
  }

  episodeStatusColor(status: string): string {
    switch (status) {
      case 'drafted':
        return 'bg-amber-500';
      case 'disabled':
        return 'bg-red-500';
      case 'enabled':
        return 'bg-green-500';
      default:
        return 'bg-amber-500';
    }
  }

  episodeStatusName(status: string): string {
    switch (status) {
      case 'drafted':
        return 'DRAFT';
      case 'disabled':
        return 'DISABLED';
      case 'enabled':
        return 'ACTIVE';
      default:
        return 'DRAFT';
    }
  }

  handlePublishEpisode(id: string): void {
    const data: any = {status: 'enabled'};
    this.episodesService.updateEpisodeStatus(data, id).subscribe(response => {
      this.episodesService.showEpisodesList(this.show.id, this.page).subscribe(response => {
        this.episodes = response.result;
      });
      this.alertService.success('Episode published successfully!');
    });
  }
}
