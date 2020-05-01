import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-engineer-modal',
  templateUrl: './engineer-modal.component.html',
  styleUrls: ['./engineer-modal.component.scss'],
})
export class EngineerModalComponent implements OnInit {

  private salePrice: number;
  private manufacturedDate: string;
  private description: string;
  private modelNumber: string;
  private modelTitle: string;
  private imageURL = '../../../assets/placeholdMask.jpg';


  constructor(private http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {}

  onSubmit() {
    this.http.post('http://localhost:5000/auth/engineer', {
      saleprice: this.salePrice,
      manufactureddate: this.manufacturedDate,
      imageurl: this.imageURL,
      description: this.description,
      modeltype: this.modelTitle,
      modelnumber: this.modelNumber
    }).subscribe(_ => {this.modalController.dismiss(); }
    );
  }
}
