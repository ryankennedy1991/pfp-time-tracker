import { Component, inject, signal } from '@angular/core';
import { ClickUpServiceService } from '../services/click-up-service.service';
import { _MatInternalFormField, MatNativeDateModule } from '@angular/material/core';
import { CalendarModule  } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ResultsTableComponent } from "./results-table/results-table.component";
import { MultiSelectModule } from 'primeng/multiselect';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

interface Assignee {
  name: string,
  code: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CalendarModule, CommonModule, FormsModule, MultiSelectModule, ResultsTableComponent, ToggleButtonModule, FloatLabelModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private clickUpService = inject(ClickUpServiceService);
  selectedCities!: Assignee[];
  
  users = [
    {name: 'Ryan Kennedy', code: 'ryan'},
    {name: 'Nicola Dickins', code: 'nicci'},
  ];

  dateFrom = "";
  value = "";
  GroupByTagsChecked = true;
  currentEntries: any = {};
  entriesByTag = signal<any>([]);
  entriesByUser = signal<any>([]);
  dateStart = "";
  dateEnd = "";

  dd = new Date("July 21, 2024 01:15:00.250");
  ms = this.dd.getMilliseconds().toString();

  async onClick(){
    let userString: string = "";
    console.log(this.selectedCities);
    this.selectedCities.forEach((user) => {
          if(this.selectedCities.length > 1){ userString = "default"}
          else {userString = user.code;}
    });

    this.dateStart = Math.floor(new Date(this.dateFrom[0]).getTime()).toFixed().toString();
    this.dateEnd = Math.floor(new Date(this.dateFrom[1]).getTime()).toFixed().toString();
    
    

    this.currentEntries = await this.clickUpService.getTimeEntries(this.dateStart, this.dateEnd, userString);
    this.entriesByTag.set(this.clickUpService.groupByTags(this.currentEntries));
    this.entriesByUser.set(this.clickUpService.groupByUsers(this.currentEntries));

    console.log(this.entriesByTag());

    
    
  }

  async downloadPDF(timeString: string) {
    const data = document.getElementById('pdf-content');


    if (data) {

        const pdf = new jsPDF('p', 'mm', 'a4');
        await pdf.html(data, { 
          callback: (d: any) => {
            d.save(timeString + "_report.pdf")
          },
          x: 10, // X offset for positioning in the PDF
          y: 10, // Y offset for positioning in the PDF
          width: 180, // Render width inside the PDF (A4 width is about 210mm)
          windowWidth: data.scrollWidth,
      });
    }
  }

  printPage(){
    window.print();
  }
      
}
