import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'connexion';
  groups:any;
  constructor(private dialog: MatDialog,public service:DataService) { }


  addList(status:any,title:any){
    let statusType = status === 'AddList' ? 'Add Status' : 'Add Item'
    this.dialog.open(AddComponent,{data: { type: statusType,title:title}});
  }
  
  closeCard(title:any,id:any){
    this.service.deleteCard(title,id);
  }

  closeStatus(title:any){
    this.service.deleteStatus(title);
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event)
    this.groups = this.service.overItems
    const previousContainerId = event.previousContainer.id.split('-')[1];
    const currentContainerId = event.container.id.split('-')[1];

    if (previousContainerId !== currentContainerId) {
      // Item was dropped onto a new container
      console.log('Item was dropped onto a new container');

      // Find the previous and current groups based on their container IDs
      const previousGroup = this.groups.find((group:any) => ('group-' + group.id) === previousContainerId);
      const currentGroup = this.groups.find((group:any) => ('group-' + group.id) === currentContainerId);

      // Move the item to the new group's array
      moveItemInArray(previousGroup.items, event.previousIndex, event.currentIndex);
      moveItemInArray(currentGroup.items, event.currentIndex, event.previousIndex);
    } else {
      // Item was dropped back onto the same container
      console.log('Item was dropped back onto the same container');
    }
  }
  

}
