import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe_url' })
export class SafePipeComponent implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content) {
    console.log(content);
    return this.sanitizer.bypassSecurityTrustResourceUrl(content);
  }
}
