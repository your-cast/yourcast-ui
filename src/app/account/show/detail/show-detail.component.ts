import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {Timezone} from '../../../common/models/timezone';
import {Language} from '../../../common/models/language';
import {AlertService} from '../../../common/services/alert.service';
import {ImageService} from '../../../common/services/image.service';
import {DictionaryService} from '../../../common/services/dictionary.service';
import {ShowService} from '../../../common/services/show.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {EpisodesService} from '../../../common/services/episodes.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  showId: string | null = null;
  displayedColumns: string[] = ['id', 'artwork', 'title', 'season', 'episode', 'status', 'created', 'actions'];
  page: number = 1;

  isLoading: boolean = true;
  image: string = '';
  data: string = '';
  show: any = {};
  timezones: Timezone[] = [];
  languages: Language[] = [];
  categories: any = [];
  episodes: any = [];

  show$: Observable<any> | undefined;
  episodes$: Observable<any> | undefined;
  timezones$: Observable<any> | undefined;
  languages$: Observable<any> | undefined;
  categories$: Observable<any> | undefined;

  allRequestFinished$: Observable<any> | undefined;

  form: FormGroup = new FormGroup({
    'status': new FormControl(false, Validators.required),
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', [Validators.required, Validators.max(150)]),
    'format': new FormControl('episodic'),
    'timezone': new FormControl('Etc/GMT'),
    'language': new FormControl('en'),
    'explicit': new FormControl(false),
    'link': new FormControl(''),
    'category': new FormControl(''),
    'keywords': new FormControl(''),
    'author': new FormControl('', Validators.required),
    'owner': new FormControl('', Validators.required),
    'ownerEmail': new FormControl('', Validators.required),
    'copyright': new FormControl('')
  });

  public editor = ClassicEditor;

  constructor(
    private router: Router,
    private showService: ShowService,
    private episodesService: EpisodesService,
    private imageService: ImageService,
    private alertService: AlertService,
    private dictionaryService: DictionaryService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.showId = this.activatedRoute.snapshot.paramMap.get('id');
    this.prepareData();
  }

  prepareData(): void {
    this.show$ = this.showService.getShowInfo(this.showId);
    this.episodes$ = this.episodesService.showEpisodesList(this.showId, this.page);
    this.timezones$ = this.dictionaryService.getTimezonesDictionary();
    this.languages$ = this.dictionaryService.getLanguagesDictionary();
    this.categories$ = this.dictionaryService.getCategoriesDictionary();

    this.allRequestFinished$ = forkJoin([
      this.show$,
      this.episodes$,
      this.timezones$,
      this.languages$,
      this.categories$
    ]);

    this.allRequestFinished$.subscribe(value => {
      this.show = value[0].result;
      this.episodes = value[1].result;
      this.timezones = value[2].result;
      this.languages = value[3].result;
      this.categories = value[4].result;
      this.isLoading = false;
      this.prepareForm();
    }, error => {
      this.isLoading = false;
      // this.alertService.error('Something want wrong!');
    });
  }

  prepareForm(): void {
    this.image = this.show.artwork;
    this.data = this.show.description;
    this.form.patchValue({
      'status': this.show.status === 'enabled',
      'title': this.show.title,
      'description': this.show.description,
      'format': this.show.format,
      'timezone': this.show.timezone,
      'language': this.show.language,
      'explicit': this.show.explicit,
      'link': this.show.link,
      'category': this.show.category,
      'keywords': this.show.tags,
      'author': this.show.author,
      'owner': this.show.podcast_owner,
      'ownerEmail': this.show.email_owner,
      'copyright': this.show.copyright
    });
  }

  submitForm(): void {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    const formData: any = {
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      artwork: this.image,
      format: this.form.controls['format'].value,
      timezone: this.form.controls['timezone'].value,
      language: this.form.controls['language'].value,
      explicit: this.form.controls['explicit'].value,
      link: this.form.controls['link'].value,
      tags: this.form.controls['keywords'].value,
      category: this.form.controls['category'].value,
      author: this.form.controls['author'].value,
      podcast_owner: this.form.controls['owner'].value,
      email_owner: this.form.controls['ownerEmail'].value,
      copyright: this.form.controls['copyright'].value
    };
    this.showService.updateShow(formData, this.showId).subscribe(response => {
      this.router.navigate(['/shows/list']);
      // this.alertService.success('Show updated.');
    });
    this.isLoading = false;
  }

  uploadFile($event: Event): void {
    const element: HTMLInputElement = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let formData: FormData = new FormData();
      formData.append('file', fileList[0], fileList[0].name);
      formData.append('param', 'artwork');
      this.imageService.uploadImage(formData).subscribe(response => {
        this.image = response.path;
      });
    }
  }

  handleChangeExplicit(): void {
    this.form.get('explicit')?.setValue(!this.form.get('explicit')?.value);
  }

  handleChangeStatus(): void {
    this.form.get('status')?.setValue(!this.form.get('status')?.value);
  }

  handleChangeType(): void {
    this.form.get('format')?.setValue(this.form.get('format')?.value === 'episodic' ? 'serial' : 'episodic');
  }

  handleChangeSummary({editor}: ChangeEvent) {
    this.form.controls['description'].setValue(editor.getData());
  }

  handleMoveToEpisodeDetail(id: string): void {
    this.router.navigate(['/episode/detail/' + id]);
  }

  handlePageBottom(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.episodesService.showEpisodesList(this.showId, this.page).subscribe(response => {
      this.episodes = response.result;
    });
  }
}
