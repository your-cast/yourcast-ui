import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowService} from '../../../shared/services/show.service';
import {ImageService} from '../../../shared/services/image.service';
import {AlertService} from '../../../shared/services/alert.service';
import editor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup} from '@angular/forms';
import {AudioFileService} from '../../../shared/services/audiofile.service';
import {Track} from '@khajegan/ngx-audio-player';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {EpisodesService} from '../../../shared/services/episodes.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {
  episodeId: string | null = null;
  show: any = null;
  episode: any = null;
  data: string = '';
  audioFile: any = null;
  audioFileList: Track[] = [];

  isLoading: boolean = false;

  image: string = '';

  form: FormGroup = new FormGroup({
    'title': new FormControl(''),
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
    this.episodeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
  }

  getData(): void {
    this.episodesService.getEpisodeInfo(this.episodeId).pipe(
      switchMap(episodeResponse => {
        this.episode = episodeResponse.result;
        this.image = episodeResponse.result.cover;
        this.audioFileList.push({
          title: 'Audio file',
          link: episodeResponse.result.audio_file.link,
          artist: 'You'
        });
        this.audioFile = {
          path: episodeResponse.result.audio_file.link,
          id: episodeResponse.result.audio_file.id
        };
        this.data = episodeResponse.result.content;
        this.form.patchValue({
          title: episodeResponse.result.title,
          link: episodeResponse.result.link,
          season: episodeResponse.result.season,
          episode: episodeResponse.result.episode,
          alias: episodeResponse.result.alias,
          type: episodeResponse.result.episode_type,
          summary: episodeResponse.result.content,
          explicit: episodeResponse.result.explicit
        });
        return this.showService.showShortInfo(this.episode.show_id);
      })
    ).subscribe(
      (showResponse) => {
        this.show = showResponse.result;
      },
      () => {
        console.log('Error');
      }
    );
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
      link: this.form.controls['link'].value,
      season: this.form.controls['season'].value,
      episode: this.form.controls['episode'].value,
      alias: this.form.controls['alias'].value,
      type: this.form.controls['type'].value,
      summary: this.form.controls['summary'].value,
      explicit: this.form.controls['explicit'].value
    };

    this.episodesService.updateEpisode(formData, this.episodeId).subscribe(response => {
      this.alertService.success('Episode success updated!');
    });
  }

  handleChangeSummary({editor}: ChangeEvent): void {
    this.form.controls['summary'].setValue(editor.getData());
  }
}
