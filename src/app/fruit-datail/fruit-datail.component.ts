import { Component, OnInit, Input } from '@angular/core';
import { Fruit } from '../fruit';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FruitService }  from '../fruit.service';
@Component({
  selector: 'app-fruit-detail',
  templateUrl: './fruit-datail.component.html',
  styleUrls: ['./fruit-datail.component.css']
})
export class FruitDetailComponent implements OnInit {
  @Input() fruit: Fruit;

  constructor( 
    private route: ActivatedRoute,
    private fruitService: FruitService,
    private location: Location) { }

  ngOnInit() {
    this.getFruit();
  }

  getFruit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fruitService.getFruit(id)
      .subscribe(fruit => this.fruit = fruit);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.fruitService.updateFruit(this.fruit)
      .subscribe(() => this.goBack());
  }
}