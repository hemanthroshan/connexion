import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  localStorageData:any;
  isStatus:boolean = false;
  isItem:boolean = false;

  addForm = new FormGroup({
    statusName : new FormControl(null,[Validators.required]),
    itemName : new FormControl(null,[Validators.required]),
    itemDesc : new FormControl(null)    
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddComponent>,public service:DataService) {
    if(this.data.type === 'Add Status'){
      this.isStatus = true;
    }
    if(this.data.type === 'Add Item'){
      this.isItem = true;
    }
   }

  updateValue(status:any){
    this.service.updateLocalStorage(status,this.addForm,this.data.title);
    this.dialogRef.close();    
  }

  updateLocalStorage(dataObj:any){ 
    let getItems = localStorage.getItem('cardItems')
    if(getItems){
      this.localStorageData = JSON.parse(getItems);
      this.localStorageData.forEach((e: { title: any; data: any[]; }) => {
        if(e.title === this.data.title){
          e.data.push(dataObj)
        }
      })
      localStorage.setItem('cardItems', JSON.stringify(this.localStorageData)); 
    }
  }

 
}
