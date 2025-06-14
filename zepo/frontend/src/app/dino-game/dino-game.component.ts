import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dino-game',
  templateUrl: './dino-game.component.html',
  styleUrls: ['./dino-game.component.css']
})
export class DinoGameComponent implements OnInit {

  @Input()
  visible = true;

  constructor() {}

  ngOnInit(): void {}
}
