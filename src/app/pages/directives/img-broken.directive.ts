import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {

  constructor(
    private el: ElementRef,
  ) { }

  @HostListener("error")
  onError() {
    this.el.nativeElement.src = 'https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg'
  }


}
