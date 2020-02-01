import { Component, OnInit } from '@angular/core';
import { FruitService } from '../fruit.service';
import { Fruit } from '../fruit';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})

export class FruitsComponent implements OnInit {
  fruits: Fruit[];

  constructor(private fruitService: FruitService) { }

  ngOnInit() {
    this.getFruits();
  }

  getFruits(): void {
    this.fruitService.getFruits()
    .subscribe(fruits => this.fruits = fruits);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.fruitService.addFruit({ name } as Fruit)
      .subscribe(fruit => {
        this.fruits.push(fruit);
      });
  }

  delete(fruit: Fruit): void {
    this.fruits = this.fruits.filter(h => h !== fruit);
    this.fruitService.deleteFruit(fruit).subscribe();
  }
}
