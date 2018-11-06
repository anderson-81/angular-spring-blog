import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setCss();
  }

  private setCss() {
    $('body').css('background-color', '#BABABA');
  }

}
