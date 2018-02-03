import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Angular 4 drag & drop demo';

  ngOnInit(){
    console.log("On init");
  }

  ngAfterViewInit(){
    console.log("After view init");
  }
}
