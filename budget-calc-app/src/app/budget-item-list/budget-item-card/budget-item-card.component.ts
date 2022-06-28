import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss']
})
export class BudgetItemCardComponent implements OnInit {
  @Input() item?: BudgetItem;
  @Output() xButtonclick: EventEmitter<void> = new EventEmitter<void>();
  @Output() cardClick: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onXButtonClicked() {
    this.xButtonclick.emit();
  }

  onCardClick() {
    this.cardClick.emit();
  }
}
