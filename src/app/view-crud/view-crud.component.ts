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
  id: any = ''
  match: any
  // userData
  token = "80d0a1d1baf7f7c79f81427d40faec641c51cb495e1ccd34fddf55ea33bd8dca"

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  }
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private reference: ChangeDetectorRef,private router: Router, private activerouter: ActivatedRoute, private http: HttpClient, private ref: ChangeDetectorRef) {

  }
  change(id: any) {


  }
  ngOnInit(): void {
    this.match = this.activerouter.snapshot.queryParams['id']
    console.log("id match", this.match)
    if (this.match) {
      this.getAll()
    } else {
      this.getAllItem()
    }
  }
  openNew() {
    this.userdata = {};
    this.submitted = false;
    this.userDialog = true;

  }
  getAll() {
    this.http.get(`${environment.postApi}?user_id=${this.match}`, this.httpOptions).subscribe((res: any) => {
      this.userpost = res
    })
  }
  getAllItem() {
    this.http.get(`${environment.postApi}`, this.httpOptions).subscribe((res: any) => {
      this.userpost = res
    })
  }

  addUserData() {
    this.match = this.activerouter.snapshot.queryParams['id']
    const auser: any = {
      "user_id": this.match,
      "title": this.userdata.title,
      "body": this.userdata.body,
    }
    this.http.post(`${environment.postApi}`, auser, this.httpOptions).subscribe((res: any) => {
      console.log("res", res)
      this.userpost = res
      this.getAll()

    })
  }

  editUserData(user: any) {
    this.userdata = { ...user };
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  deleteuserDta(id: any) {
    this.confirmationService.confirm({
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`${environment.postApi}/${id}`, this.httpOptions).subscribe((res: any) => {
          this.userpost = this.userpost.filter((e: any) => e.id !== id);
          this.reference.detectChanges()
        })
      }
    });
  }
  // deleteuser(id: any) {
  //   debugger
  //   console.log("user",id)
  //   this.confirmationService.confirm({
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.http.delete(`${environment.apiEndPoint}/${id}`, this.httpOptions).subscribe((res: any) => {
  //         this.users = this.users.filter((val: any) => val.id !== id.id);
  //     this.getUser()
  //       })
  //     }
  //   });
  // }
  update() {
    this.match = this.activerouter.snapshot.queryParams['id']

    const ausers: any = {
      "user_id": this.match,
      "title": this.userdata.title,
      "body": this.userdata.body,
    }
    console.log(ausers)
    this.http.put(`${environment.postApi}/${this.userdata.id}`, ausers, this.httpOptions).subscribe((res: any) => {
      this.userpost = res
      this.getAllItem()
    })
  }



  saveuser() {
    this.userDialog = false;
    if (this.userdata.id) {
      this.userpost[this.findIndexById(this.userdata.id)] = this.userdata;
    } else {
      this.addUserData()
    }

  }

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
}










  // update( ){
  //  debugger
  //   const ausers: any = {
  //     "id": this.userdata.id,
  //     "user_id": this.userdata.user_id,
  //     "title": this.userdata.title,
  //     "body": this.userdata.body,
  //   }
  //  console.log(ausers)
  //  this.http.put(`${environment.postApi}/${this.userdata.id}`, ausers,this.httpOptions).subscribe((res: any) => {
  //   if (res) {
  //     const findIndex = this.userpost.findIndex((f: any) => f.id == this.userdata.id);
  //     if (findIndex > -1) {
  //       this.userpost[findIndex] = { ...this.userpost[findIndex], ...ausers }
  //     }
  //   }
  //   else {
  //     alert("data not update")
  //   }
  //   console.log("update", res)
  //   this.getAllItem()
  // })
  // }
   // saveuser() {
  //   this.userDialog = false;
  //   if (this.userdata.id) {
  //     this.userpost[this.findIndexById(this.userdata.id)] = this.userdata;
  //   } else {
  //     this.addUserData()
  //   }

  // }













  // token = "80d0a1d1baf7f7c79f81427d40faec641c51cb495e1ccd34fddf55ea33bd8dca"

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': 'Bearer ' + this.token
  //   })
  // }
  // constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router, private activerouter: ActivatedRoute, private http: HttpClient, private ref: ChangeDetectorRef) {

  // }
  // change(id: any) {


  // }
  // ngOnInit(): void {
  //   this.match = this.activerouter.snapshot.queryParams['id']
  //   console.log("id match",this.match)
  //      if(this.match){
  //       this.getAll()
  //      }else{
  //    this.getAllItem()
  //      }
  // }
  // openNew() {
  //   this.userdata = {};
  //   this.submitted = false;
  //   this.userDialog = true;

  // }
  // getAll() {
  //   this.http.get(`${environment.postApi}?user_id=${this.match}`, this.httpOptions).subscribe((res: any) => {
  //     this.userpost = res
  //   })
  // }
  // getAllItem() {
  //   this.http.get(`${environment.postApi}`, this.httpOptions).subscribe((res: any) => {
  //     this.userpost = res
  //   })
  // }

  // addUserData() {
  //   this.match = this.activerouter.snapshot.queryParams['id']
  //   const auser: any = {
  //     // "id": this.userdata.id,
  //     "user_id": this.userdata.user_id,
  //     "title": this.userdata.title,
  //     "body": this.userdata.body,
  //   }
  //   this.http.post(`${environment.postApi}`, auser, this.httpOptions).subscribe((res: any) => {
  //     console.log("res", res)
  //     this.userpost = res
  //     this.getAll()

  //   })
  // }

  // editUserData(user: any) {
  //   this.userdata = { ...user };
  //   this.userDialog = true;
  // }
  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.userpost.length; i++) {
  //     if (this.userpost[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }
  // hideDialog() {
  //   this.userDialog = false;
  //   this.submitted = false;
  // }
  // deleteuserDta(user: any) {
  //   this.confirmationService.confirm({
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.userpost = this.userpost.filter((val: any) => val.id !== user.id);
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  //     }
  //   });
  // }
  // update() {
  //   const ausers: any = {
  //     "id": this.userdata.id,
  //     "user_id": this.userdata.user_id,
  //     "title": this.userdata.title,
  //     "body": this.userdata.body,
  //   }
  //   console.log(ausers)
  //   this.http.put(`${environment.postApi}/${this.userdata.id}`, ausers, this.httpOptions).subscribe((res: any) => {
  //     this.userpost = res
  //     this.getAllItem()
  //   })
  // }


  // saveuser() {
  //   this.userDialog = false;
  //   if (this.userdata.id) {
  //     this.update()
  //     console.log("kaju")
  //   } else {
  //     this.addUserData()
  //   }

  // }