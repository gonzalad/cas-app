import { Component, OnInit } from '@angular/core';
import { GreetingsService } from './greetings.service';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent implements OnInit {

  public message: string;

  constructor(private greetingsService: GreetingsService) { }

  ngOnInit() {
  }

  public greet() {
      this.greetingsService.greet().subscribe((greetings) => this.message = greetings.message);
  }
}
