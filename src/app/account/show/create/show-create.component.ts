import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {Timezone} from '../../../common/models/timezone';
import {Language} from '../../../common/models/language';
import {AlertService} from '../../../common/services/alert.service';
import {ImageService} from '../../../common/services/image.service';
import {DictionaryService} from '../../../common/services/dictionary.service';
import {ShowService} from '../../../common/services/show.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-show-create',
  templateUrl: './show-create.component.html',
  styleUrls: ['./show-create.component.scss']
})
export class ShowCreateComponent implements OnInit {
  isLoading: boolean = false;
  image: string = '';
  timezones: Timezone[] = [];
  languages: Language[] = [];
  categories: any = [];

  timezones$: Observable<any> | undefined;
  languages$: Observable<any> | undefined;
  categories$: Observable<any> | undefined;

  allRequestFinished$: Observable<any> | undefined;

  form: FormGroup = new FormGroup({
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', [Validators.required, Validators.max(150)]),
    'artwork': new FormControl(''),
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
    private imageService: ImageService,
    private alertService: AlertService,
    private dictionaryService: DictionaryService
  ) {
  }

  ngOnInit() {
    this.prepareDictionary();
  }

  prepareDictionary(): void {
    this.timezones$ = this.dictionaryService.getTimezonesDictionary();
    this.languages$ = this.dictionaryService.getLanguagesDictionary();
    this.categories$ = this.dictionaryService.getCategoriesDictionary();

    this.allRequestFinished$ = forkJoin([this.timezones$, this.languages$, this.categories$]);

    this.allRequestFinished$.subscribe(value => {
      this.timezones = value[0].result;
      this.languages = value[1].result;
      this.categories = value[2].result;
    }, error => {
      // this.alertService.error('Something want wrong!');
    });
  }

  submitForm(): void {
    if (!this.form.valid) {
      return;
    }
    const self = this;
    this.isLoading = true;
    const formData: any = {
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      artwork: this.form.controls['artwork'].value,
      format: this.form.controls['format'].value,
      timezone: this.form.controls['timezone'].value,
      language: this.form.controls['language'].value,
      explicit: this.form.controls['explicit'].value,
      tags: this.form.controls['keywords'].value,
      category: this.form.controls['category'].value,
      author: this.form.controls['author'].value,
      podcast_owner: this.form.controls['owner'].value,
      email_owner: this.form.controls['ownerEmail'].value,
      copyright: this.form.controls['copyright'].value
    };
    this.showService.createShow(formData).subscribe(response => {
      this.router.navigate(['/shows/list']);
      // this.alertService.success('New show created!');
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

  handleChangeType(): void {
    this.form.get('format')?.setValue(this.form.get('format')?.value === 'episodic' ? 'serial' : 'episodic');
  }

  handleChangeSummary({editor}: ChangeEvent) {
    this.form.controls['description'].setValue(editor.getData());
  }
}
