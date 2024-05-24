import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pipe-examples',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pipe-examples.component.html',
  styleUrl: './pipe-examples.component.scss'
})
export class PipeExamplesComponent {
  currentDate: Date = new Date();
  amount: number = 1234.56;
  percentage: number = 0.78;

  currentLang: string;
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.currentLang = this.translate.currentLang;
  }

  switchLanguage(language: string) {
    this.translate.use(language).subscribe(() => {
      this.currentLang = this.translate.currentLang;

      console.log(this.translate.currentLang);
    });
  }
}
