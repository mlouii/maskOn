import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItemsService} from '../../shared/items.service';
import {Item} from '../../shared/item.model';
import {Model} from './model.model';
import {ModalController} from '@ionic/angular';
import {EngineerModalComponent} from './engineer-modal/engineer-modal.component';

@Component({
  selector: 'app-engineer-section',
  templateUrl: './engineer-section.component.html',
  styleUrls: ['./engineer-section.component.scss'],
})
export class EngineerSectionComponent implements OnInit {

  private loadedItems: Item[];
  private modelsList: Model[];
  constructor(private http: HttpClient, private itemsService: ItemsService, private modalController: ModalController) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.itemsService.items.subscribe(
        data => {
          this.loadedItems = data;
          this.http.get('http://localhost:5000/auth/engineer').subscribe(
              modelData => {
                  const newModelsList = [];
                // @ts-ignore
                  for (const mod of modelData) {
                  const newModel = new Model(
                      mod.modelnumber,
                      mod.saleprice,
                      mod.manufactureddate,
                      0
                  );
                  const preloaded = this.loadedItems.find(item => item.id === mod.modelnumber);
                  if (preloaded) {
                    newModel.quantity = preloaded.availableQuantity;
                  }
                  newModelsList.push(newModel);
                }
                  this.modelsList = newModelsList;
              }
          );
        }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EngineerModalComponent
    });
    modal.onDidDismiss().then(
        _ => {
          this.fetchData();
        }
    );
    return modal.present();
  }
}
