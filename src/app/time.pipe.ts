import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(value: number, format: 's' | 'm' | 'h' | 'd' | 'full' | ''): 
  string | { d: number; h: number; m: number; s: number } {
    let days: number, hours: number, minutes: number, seconds: number;
    let total_hours: number, total_minutes: number, total_seconds: number;
    let final_hours: string, final_minutes: string, final_seconds: string;
  
    total_seconds = Math.floor(value / 1000);
    total_minutes = Math.floor(total_seconds / 60);
    total_hours = Math.floor(total_minutes / 60);
    days = Math.floor(total_hours / 24);
  
    seconds = total_seconds % 60;
    minutes = total_minutes % 60;
    hours = total_hours;

    // Add leading zeros
    final_seconds = seconds.toString().padStart(2, '0');
    final_minutes = minutes.toString().padStart(2, '0');
    final_hours = total_hours.toString().padStart(2, '0');
  
    switch (format) {
      case 's':
        return total_seconds.toString();
      case 'm':
        return total_minutes.toString();
      case 'h':
        return total_hours.toString();
      case 'd':
        return days.toString();
      case 'full':
        return final_hours + ":" + final_minutes + ":" +final_seconds;
      default:
        return { d: days, h: hours, m: minutes, s: seconds };
    }
  }
}
