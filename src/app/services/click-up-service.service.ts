import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface Tag {
  name: string;
}

interface TimeEntry {
  tags: Tag[];
  [key: string]: any; // Additional properties
}

type UsersArray = {
  ryan: string;
  nicci: string;
  default: string;
};

@Injectable({
  providedIn: 'root'
})
export class ClickUpServiceService {
  private http = inject(HttpClient);
  currentData: any = [];

  private users: UsersArray = {
    ryan: "74653071",
    nicci: "81786779",
    default: "81786779,74653071"
  };

  private teamId = '9012141942';

  async getTimeEntries(startDate: string, endDate: string, assignee: string = "default") {
    const userIndex = this.users[assignee as keyof UsersArray];

    const q = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      task_id: 'string',
      custom_task_ids: 'true',
      team_id: this.teamId,
      assignee: userIndex,
    }).toString();

    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/team/${this.teamId}/time_entries?${q}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'pk_74653071_V04Y36K7OAOLFLQ80BJCSCZOR2FAEEU4'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      this.currentData = await response.json();
      return this.currentData.data;

    } catch (error) {
      console.error('Failed to fetch time entries:', error);
      return [];
    }
  }

  groupByTags(data: TimeEntry[]) {
    const tagMap: { [key: string]: { name: string; entries: TimeEntry[]; totalTime: number; } } = {};
    const totalTime: string = "";

    data.forEach((item) => {
      item.tags.forEach((tag) => {
        if (!tagMap[tag.name]) {
          tagMap[tag.name] = {
            name: tag.name,
            entries: [],
            totalTime: 0
          };
        }
        tagMap[tag.name].entries.push(item);
        tagMap[tag.name].totalTime = tagMap[tag.name].totalTime + parseInt(item['duration']);
        console.log(tagMap[tag.name]);
      });
    });

    

    


    // Convert tagMap to an array of grouped tag objects
    return Object.values(tagMap).sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

  groupByUsers(data: TimeEntry[]) {
    const tagMap: { [key: string]: { name: string; entries: TimeEntry[]; totalTime: number; } } = {};
    const totalTime: string = "";

    data.forEach((item) => {
      
        if (!tagMap[item['user'].username]) {
          tagMap[item['user'].username] = {
            name: item['user'].username,
            entries: [],
            totalTime: 0
          };
        }
        
        tagMap[item['user'].username].entries.push(item);
        tagMap[item['user'].username].totalTime = tagMap[item['user'].username].totalTime + parseInt(item['duration']);
        console.log(tagMap[item['user'].username]);
      });
    

    

    


    // Convert tagMap to an array of grouped tag objects
    return Object.values(tagMap).sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

 

}
