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
  selected = '';
  urls: {};
  site_url: string;
  available;
  message = '';
  sideIcon = false;
  spinner = true;
  itemsPerSlide = 10;
  singleSlideOffset = false;
  noWrap = true;

  slidesChangeMessage = '';

  slides = [
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/3.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/5.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/6.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/7.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/8.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
    },
    ,
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/3.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/5.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/6.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/7.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/8.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg',
    },
    {
      image:
        'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
    },
  ];

  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

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
      this.open = false;
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
      this.itemsPerSlide = 3;
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
    this.selected = this.urls[0].site_area;
  }
  onClick(url: string, area: string) {
    this.site_url = url;
    this.selected = area;
    if (!this.mq.matches) {
      this.open = false;
    }
  }
}
