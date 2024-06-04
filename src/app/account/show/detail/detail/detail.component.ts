import {Component, Input, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {Router} from '@angular/router';
import {ShowService} from '../../../../shared/services/show.service';
import {ImageService} from '../../../../shared/services/image.service';
import {DictionaryService} from '../../../../shared/services/dictionary.service';
import {Language} from '../../../../shared/models/language';
import {Timezone} from '../../../../shared/models/timezone';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ShowDetailComponent implements OnInit {
  @Input()
  show: any = {};

  isLoading: boolean = true;
  image: string = '';
  data: string = '';
  timezones: Timezone[] = [];
  languages: Language[] = [];
  categories: any = [];

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
    private alertService: AlertService,
    private showService: ShowService,
    private imageService: ImageService,
    private dictionaryService: DictionaryService,
  ) {
  }

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    this.timezones$ = this.dictionaryService.getTimezonesDictionary();
    this.languages$ = this.dictionaryService.getLanguagesDictionary();
    this.categories$ = this.dictionaryService.getCategoriesDictionary();

    this.allRequestFinished$ = forkJoin([
      this.timezones$,
      this.languages$,
      this.categories$
    ]);

    this.allRequestFinished$.subscribe(value => {
      this.timezones = value[0].result;
      this.languages = value[1].result;
      this.categories = value[2].result;
      this.isLoading = false;
      this.prepareForm();
    }, error => {
      this.isLoading = false;
      // this.alertService.success('Something want wrong!');
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
      copyright: this.form.controls['copyright'].value,
      status: this.form.controls['status'].value
    };
    this.showService.updateShow(formData, this.show.id).subscribe(response => {
      // this.router.navigate(['/shows/list']);
      this.alertService.success('Show updated.');
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

  handleChangeSummary({editor}: ChangeEvent): void {
    this.form.controls['description'].setValue(editor.getData());
  }
}
