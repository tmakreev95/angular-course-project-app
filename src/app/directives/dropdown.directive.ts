import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpened: boolean = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpened = this.elementRef.nativeElement.contains(event.target) ? !this.isOpened : false;
  }

  constructor(private elementRef: ElementRef) { }
}
