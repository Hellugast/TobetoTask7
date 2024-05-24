import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButton]',// Directive'ın uygulanacağı öğeleri belirtiyoruz
  standalone: true
})
export class AppButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // Mouse üzerine gelindiğinde ve üzerinden çıkıldığında stilleri değiştiriyoruz
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#4CAF50');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#2E8B57');
  }
}