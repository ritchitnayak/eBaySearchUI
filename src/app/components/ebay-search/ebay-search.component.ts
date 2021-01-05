import { Component, OnInit } from '@angular/core';
import { EbaySearchService } from "../../services/ebay-search.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


import { SearchFormData } from "../../models/SearchFormData";
import { SearchItem } from "../../models/SearchItem";

@Component({
  selector: 'app-ebay-search',
  templateUrl: './ebay-search.component.html',
  styleUrls: ['./ebay-search.component.css']
})
export class EbaySearchComponent implements OnInit {
  items: SearchItem[];
  pnum: number = 1;
  totalItems: number = 0;
  keywords: string;
  onResult: boolean = false;
  pgCtrlMaxSize: number = 10;
  nores: boolean = false;

  constructor(private ebay:EbaySearchService, private smallObserver:BreakpointObserver, private largeObserver:BreakpointObserver) { 
    smallObserver.observe([
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.activateSmallLayout();
      }
    });

    largeObserver.observe([
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        this.activateLargeLayout();
      }
    });
  }

  ngOnInit(): void {
  }

  searchEbay(fdata: SearchFormData) {
    var url = Object.keys(fdata).map(key => key + '=' + fdata[key]).join('&');
    this.keywords = fdata.keywords;
    this.ebay.getItems(url).subscribe(items => {
      this.items = items;
      this.totalItems = this.items.length;
      this.onResult = true;
      if(this.totalItems == 0) {
        this.nores = true;
      } else {
        this.nores = false;
      }
    });
  }

  clearData() {
    this.items.length = 0;
    this.totalItems = 0;
    this.onResult = false;
    this.nores = false;
  }

  activateSmallLayout() {
    this.pgCtrlMaxSize = 5;
  }

  activateLargeLayout() {
    this.pgCtrlMaxSize = 10;
  }

}
