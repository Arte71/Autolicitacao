import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core'; 

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
})
export class TitleComponent {
  readonly main = input.required<string>();
  readonly sub = input<string>();

}
