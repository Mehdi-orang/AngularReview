import { Component, OnInit } from '@angular/core';
import { Fruit } from '../fruit';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {
  fruit: Fruit = {
    id: 1,
    name: 'Apple'
  };

  constructor() { }

  ngOnInit() {
  }

}
