import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DigiOwner';
  onLoad() {}

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    console.log(event);

    // visible height + pixel scrolled >= total height
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      console.log('End');
    }
  }
}
