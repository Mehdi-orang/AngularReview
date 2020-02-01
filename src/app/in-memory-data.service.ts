import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Fruit } from './fruit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const fruits = [
      { id: 1, name: 'Avacado' },
      { id: 2, name: 'Orange' },
      { id: 3, name: 'Water Melon' },
      { id: 4, name: 'Pomegranate' },
      { id: 5, name: 'Mango' },
      { id: 16, name: 'Straberry' },
      { id: 17, name: 'Grape' },
      { id: 18, name: 'Blue Berry' },
      { id: 19, name: 'Date' },
      { id: 20, name: 'Apple' }
    ];
    return {fruits};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(fruits: Fruit[]): number {
    return fruits.length > 0 ? Math.max(...fruits.map(fruit => fruit.id)) + 1 : 11;
  }
}
