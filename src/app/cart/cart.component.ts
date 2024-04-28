import { CommonModule } from '@angular/common';
import { Component, Renderer2, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  prod1Price = signal<number>(250);
  prod1Qty = signal<number>(1);
  prod2Price = signal<number>(200);
  prod2Qty = signal<number>(1);
  shipping = signal<number>(4.99);
  subtotalAmt = computed(
    () =>
      this.prod1Price() * this.prod1Qty() + this.prod2Price() * this.prod2Qty()
  );
  totalAmt = computed(() => this.subtotalAmt() + this.shipping());

  constructor(private render: Renderer2) {
    effect(() => {
      const checkout = document.getElementsByClassName('checkout')[0];

      const bg =
        this.subtotalAmt() === 0 ? 'rgb(225 225 225)' : 'rgb(255 255 255)';
      this.render.setStyle(checkout, 'background', bg);
    });
  }
}
