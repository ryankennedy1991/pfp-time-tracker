import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TimePipe } from '../../time.pipe';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [DatePipe, TableModule, ButtonModule, CommonModule, TitleCasePipe, TimePipe],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css'
})
export class ResultsTableComponent {
  

  @Input() currentEntries: any;
  @Input() currentEntriesByUser: any;

  onRowExpand(event: Event){
    console.log(event);
  }

  onRowCollapse(){

  }

  expandAll(){

  }

  collapseAll(){

  }

}
