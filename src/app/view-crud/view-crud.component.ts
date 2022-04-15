import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-crud',
  templateUrl: './view-crud.component.html',
  styleUrls: ['./view-crud.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ViewCrudComponent implements OnInit {
  userpost: any = []
  submitted!: boolean;
  selectedProducts: any = [];
  userDialog!: boolean;
  userdata: any;
  id:any = ''

  token = "80d0a1d1baf7f7c79f81427d40faec641c51cb495e1ccd34fddf55ea33bd8dca"

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  }
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router : Router,private activerouter :ActivatedRoute,private http: HttpClient, private ref: ChangeDetectorRef) {

  }
change(){
  this.id

}

  ngOnInit(): void {
    this.getAllItem()
  }
  openNew() {
    this.userdata = {};
    this.submitted = false;
    this.userDialog = true;

  }
  getAllItem() {
   this.http.get(`${environment.postApi}`,this.httpOptions).subscribe((res:any)=>{
     this.userpost = res
   })
  }

  addUserData() {
    const auser: any = {
      "id": this.userdata.id,
      "user_id": this.userdata.user_id,
      "title": this.userdata.title,
      "body": this.userdata.body,
    }
    this.http.post(`${environment.postApi}`,auser,this.httpOptions).subscribe((res: any) => {
      console.log("res",res)
    this.userpost = res
      this.getAllItem()
    })
  }

  editUserData(user: any) {
    this.userdata = { ...user };
    this.userDialog = true;
  }
  // saveuser() {
  //   this.userDialog = false;
  //   if (this.userdata.id) {
  //     this.userpost[this.findIndexById(this.userdata.id)] = this.userdata; 
  //   } else {
  //     this.addUserData()
  //   }

  // }


  
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.userpost.length; i++) {
        if (this.userpost[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  deleteuserDta(user: any) {
    this.confirmationService.confirm({
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userpost = this.userpost.filter((val: any) => val.id !== user.id);
        // this.user = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }
  update(){
   
    const ausers: any = {
      "id": this.userdata.id,
      "user_id": this.userdata.user_id,
      "title": this.userdata.title,
      "body": this.userdata.body,
    }
   console.log(ausers)
    this.http.put(`${environment.postApi}`,ausers,this.httpOptions).subscribe((res:any)=>{
      console.log("res",res)
      this.userpost = res 
      this.getAllItem()
console.log("hello")
    })
  }
  saveuser() {
    debugger
      this.userDialog = false;
    //   if (this.userdata.id) {
    //     this.update()
    //     console.log("kaju")
    //   } else {
    //     this.addUserData()
    //   }
    this.update()
}
}
