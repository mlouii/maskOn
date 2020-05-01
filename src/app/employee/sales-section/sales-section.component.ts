import { Component, OnInit } from '@angular/core';
import {OrderData} from './orderData.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sales-section',
  templateUrl: './sales-section.component.html',
  styleUrls: ['./sales-section.component.scss'],
})
export class SalesSectionComponent implements OnInit {

  private totalRevenue = 0;
  private allOrders: OrderData[];
  private customerRevenues: [string, number][];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const newCustomerRevenues = [];
    const newAllOrders = [];
    let rev = 0;
    this.http.get('http://localhost:5000/totalrevenue').subscribe(
        data => {
          // @ts-ignore
          for (const customer of data) {
            newCustomerRevenues.push([customer.customerid, customer.sum]);
            rev += customer.sum;
          }
          this.customerRevenues = newCustomerRevenues;
          this.totalRevenue = rev;
        }
    );
    this.http.get('http://localhost:5000/auth/sales').subscribe(
      data => {
        // @ts-ignore
        for (const ord of data) {
          const toAdd = new OrderData(
              ord.ordernumber,
              ord.customerid,
              ord.modelnumber,
              ord.salevalue,
              ord.timedate,
              ord.quantity
          );
          newAllOrders.push(toAdd);
        }
        this.allOrders = newAllOrders;
      }
    );
  }

}
