import { ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';

describe('ImgBrokenDirective', () => {

  let directive: ImgBrokenDirective;

  let mockElementRef = {
    nativeElement: {
      src: 'url'
    }
  }

  beforeEach(() => {
     directive = new ImgBrokenDirective(
      <ElementRef>(<unknown>mockElementRef)
    );
  })

  it('should create an instance', () => {

    expect(directive).toBeTruthy();
  });

  it('should test error', () => {

    directive.onError()
  
    expect(mockElementRef.nativeElement).toBeDefined();
  });
});
