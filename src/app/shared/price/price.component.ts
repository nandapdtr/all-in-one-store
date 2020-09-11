import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Input() currencyCode: string;
  @Input() price: number;
  @Input() 
  @HostBinding('class.padded')
  padded = false;

  constructor() { }

  ngOnInit(): void {
  }

}
