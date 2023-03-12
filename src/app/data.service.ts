import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  overItems:any = []

  constructor() {
    this.sortLocalStorage();
   }

  updateLocalStorage(status:any,form:any,title:any){
    let obj:any = {};        
    if(status === 'status' && form){
      obj['title'] = form['controls']['statusName']['value'];
      obj['data'] = [];
      this.overItems.push(obj)
    }
    if(status === 'item'){      
      obj['name'] = form['controls']['itemName']['value'];
      obj['desc'] = form['controls']['itemDesc']['value'];
      obj['time'] = this.getTime();
      obj['id'] = Math.floor(Math.random() * (1000)) + 1;
      let getItems = localStorage.getItem('cardItems')
      if(getItems){
        this.overItems = JSON.parse(getItems);
        this.overItems.find((e: { title: any; data: any[]; }) => {
          if(e.title === title){
            e.data.push(obj)
          }
        })
      }
    }
    localStorage.setItem('cardItems', JSON.stringify(this.overItems));
    this.sortLocalStorage()
  }

  getTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;    
  }

  sortLocalStorage(){    
    let getItems = localStorage.getItem('cardItems')
    if(getItems){
      this.overItems = JSON.parse(getItems);      
      this.overItems.forEach((e:{ title: any; data: any[]; }) => {
        e.data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
      })        
    }    
  }

  deleteCard(title:any,id:any){
    this.overItems.forEach((e:{ title: any; data: any[]; }) => {
      if(e.title === title){
        e.data = e.data.filter(e => e.id != id);
      }
    });
    localStorage.setItem('cardItems', JSON.stringify(this.overItems));
    this.sortLocalStorage()    
  }

  deleteStatus(title:any){
    this.overItems = this.overItems.filter((e:{ title: any; data: any[]; }) => e.title != title);      
    localStorage.setItem('cardItems', JSON.stringify(this.overItems));
    this.sortLocalStorage()
  }
}
