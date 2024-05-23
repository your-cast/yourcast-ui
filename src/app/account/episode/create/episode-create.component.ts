import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../../common/services/show.service';
import {ImageService} from '../../../common/services/image.service';
import {AlertService} from '../../../common/services/alert.service';
import editor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup} from '@angular/forms';
import {AudioFileService} from '../../../common/services/audiofile.service';
import {Track} from '@khajegan/ngx-audio-player';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {EpisodesService} from '../../../common/services/episodes.service';

@Component({
  selector: 'app-episode-create',
  templateUrl: './episode-create.component.html',
  styleUrls: ['./episode-create.component.scss']
})
export class EpisodeCreateComponent implements OnInit {
  showId: string | null = null;
  show: any = null;

  audioFile: any = null;
  audioFileList: Track[] = [];

  isLoading: boolean = false;

  image: string = '';

  form: FormGroup = new FormGroup({
    'title': new FormControl(''),
    'subtitle': new FormControl(''),
    'link': new FormControl(''),
    'season': new FormControl('1'),
    'episode': new FormControl('1'),
    'alias': new FormControl(''),
    'type': new FormControl('full'),
    'summary': new FormControl(''),
    'explicit': new FormControl(false)
  });

  protected readonly editor = editor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private showService: ShowService,
    private imageService: ImageService,
    private audioFileService: AudioFileService,
    private alertService: AlertService,
    private episodesService: EpisodesService
  ) {
  }

  ngOnInit() {
    this.subscribeEditForm();
    this.showId = this.activatedRoute.snapshot.paramMap.get('id');
    this.showService.getShowInfo(this.showId).subscribe(response => {
      this.show = response.result;
    });
  }

  subscribeEditForm(): void {
    const english: RegExp = /^[A-Za-z\s]*$/;
    this.form.controls['title'].valueChanges.subscribe((value: any) => {
      if (english.test(value)) {
        this.form.patchValue({
          alias: this.replaceSymbols(value)
        });
      } else {
        this.form.patchValue({
          alias: this.replaceCyrillicSymbols(value)
        });
      }
    });
  }

  replaceSymbols(value: string): string {
    const replace: RegExp = /[^A-Z\d]/ig;
    return value.replace(replace, '-').toLowerCase();
  }

  replaceCyrillicSymbols(value: string): string {
    const cyrillic: { [key: string]: string; } = {
      'А': 'A', 'а': 'a', 'Б': 'B', 'б': 'b', 'В': 'V', 'в': 'v', 'Г': 'G',
      'г': 'g', 'Ґ': 'G', 'ґ': 'g', 'Д': 'D', 'д': 'd', 'Е': 'I', 'е': 'i',
      'Є': 'E', 'є': 'e', 'Ж': 'G', 'ж': 'g', 'З': 'Z', 'з': 'z', 'И': 'I',
      'и': 'i', 'І': 'I', 'і': 'i', 'Ї': 'I', 'ї': 'i', 'Й': 'Y', 'й': 'y',
      'К': 'K', 'к': 'k', 'Л': 'L', 'л': 'l', 'М': 'M', 'м': 'm', 'Н': 'N',
      'н': 'n', 'О': 'O', 'о': 'o', 'П': 'P', 'п': 'p', 'Р': 'R', 'р': 'r',
      'С': 'C', 'с': 'c', 'Т': 'T', 'т': 't', 'У': 'U', 'у': 'u', 'Ф': 'F',
      'ф': 'f', 'Х': 'H', 'х': 'h', 'Ц': 'C', 'ц': 'c', 'Ч': 'Ch', 'ч': 'ch',
      'Ш': 'Sh', 'ш': 'sh', 'Щ': 'Shc', 'щ': 'shc', 'ь': 'a', 'Ю': 'U',
      'ю': 'u', 'Я': 'Ya', 'я': 'ya'
    };
    const translate: any[] = [];
    value = value.replace(/[ъь]+/g, '').replace(/й/g, 'i');
    for (let i = 0; i < value.length; ++i) {
      translate.push(
        cyrillic[value[i]] || cyrillic[value[i].toLowerCase()] == undefined && value[i]
        || cyrillic[value[i].toLowerCase()].replace(/^(.)/, function (match) {
          return match.toUpperCase();
        })
      );
    }

    return this.replaceSymbols(translate.join('')).toLowerCase();
  }

  uploadFile($event: Event): void {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let formData: FormData = new FormData();
      formData.append('audio', fileList[0], fileList[0].name);
      this.audioFileService.uploadAudioFile(formData).subscribe(response => {
        this.audioFileList.push({
          title: 'Audio file',
          link: response.path,
          artist: 'You'
        });
        this.audioFile = {
          path: response.path,
          id: response.file_id
        };
      });
    }
  }

  deleteAudioFile(): void {
    this.audioFileList = [];
    this.audioFile = null;
  }

  uploadImage($event: Event): void {
    const element = $event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let formData: FormData = new FormData();
      formData.append('file', fileList[0], fileList[0].name);
      formData.append('param', 'cover');

      this.imageService.uploadImage(formData).subscribe(response => {
        this.image = response.path;
      });
    }
  }

  submitForm(): void {
    if (!this.form.valid) {
      return;
    }

    const formData = {
      show_id: this.show.id,
      audio_id: this.audioFile.id,
      cover: this.image,
      title: this.form.controls['title'].value,
      subtitle: this.form.controls['subtitle'].value,
      link: this.form.controls['link'].value,
      season: this.form.controls['season'].value,
      episode: this.form.controls['episode'].value,
      alias: this.form.controls['alias'].value,
      type: this.form.controls['type'].value,
      summary: this.form.controls['summary'].value,
      explicit: this.form.controls['explicit'].value
    };

    this.episodesService.createEpisode(formData).subscribe(response => {
      this.router.navigate(['/shows/list']);
      // this.alertService.success('New episode added to your show!');
    });
  }

  handleChangeSummary({editor}: ChangeEvent) {
    this.form.controls['summary'].setValue(editor.getData());
  }
}
