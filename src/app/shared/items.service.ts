import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items = new BehaviorSubject<Item[]>([
      new Item('1', 2.00, 'Regular Mask', Date())
  ]);

  constructor() { }
}
