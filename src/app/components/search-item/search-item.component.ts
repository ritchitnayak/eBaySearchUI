import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "../../models/SearchItem";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  @Input() item: SearchItem;

  isExpanded: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.isExpanded = !this.isExpanded;
  }

}
