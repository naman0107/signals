import { CommonModule } from '@angular/common';
import { Component, Renderer2, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  count = signal<number>(0);

  constructor(private render: Renderer2) {
    effect(() => {
      console.log(`Count value is ${this.count()}`);
      this.count() >= 5
        ? this.render.setStyle(
            document.body,
            'background',
            'rgb(228, 228, 228)'
          )
        : this.render.setStyle(
            document.body,
            'background',
            'rgb(255, 255, 255)'
          );
    });
  }
}
