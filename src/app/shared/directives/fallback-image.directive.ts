import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fallbackImage]',
  standalone: true
})
export class FallbackImageDirective {
  @Input() fallbackImage!: string;

  constructor(private el: ElementRef) { }

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.fallbackImage;
  }
}
