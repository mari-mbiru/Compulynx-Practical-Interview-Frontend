import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

  @Input() pageTitle!: string;
  @Input() logoSrc!: string;
  
}
