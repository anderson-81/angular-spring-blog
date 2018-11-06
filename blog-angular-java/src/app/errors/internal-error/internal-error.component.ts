import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.css']
})
export class InternalErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setCss();
  }

  private setCss() {
    $('body').css('background-color', '#BABABA');
  }

}
