import { SiteMasterService } from './../Services/site-master.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements OnInit, AfterViewInit {
  public mod: string;
  open: boolean;
  id: string;
  mq = window.matchMedia('(min-width: 800px)');
  menue: boolean;
  urls: {};
  site_url: string;
  available;
  message = '';
  sideIcon = false;
  spinner = true;

  constructor(
    private routes: ActivatedRoute,
    private siteMasterService: SiteMasterService,
    public sanitizer: DomSanitizer
  ) {
    if (matchMedia) {
      this.mq.addEventListener('change', () => {
        console.log(this.mq.matches);
        this.ngOnInit();
      });
    }
  }

  ngOnInit() {
    if (this.mq.matches) {
      this.open = true;
      this.mod = 'side';
      this.menue = false;
      this.sideIcon = false;
      console.log(this.mq.matches);
    } else {
      console.log(this.mq.matches);
      this.open = false;
      this.mod = 'over';
      this.menue = true;
      this.sideIcon = true;
      // window width is less than 500px
    }
    this.routes.paramMap.subscribe((paraMaps: ParamMap) => {
      this.id = paraMaps.get('id');
      console.log(this.id);

      if (this.id) {
        this.siteMasterService.getUrls(this.id).subscribe((result) => {
          console.log(typeof result);
          if (typeof result === 'string') {
            this.available = false;
            this.message = 'Data Not Available';
            this.spinner = false;
          } else {
            this.available = true;
            this.urls = result;
            console.log('inside if');
            this.setUrl();
            this.spinner = false;
          }
        });
      }
    });
  }
  ngAfterViewInit() {}
  setUrl() {
    this.site_url = this.urls[0].site_url;
  }
  onClick(url: string) {
    this.site_url = url;
    if (!this.mq.matches) {
      this.open = false;
    }
  }
}
