
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Product } from './product';


@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UserCrudComponent implements OnInit {
  users: any = []
  status: any = [];
  submitted!: boolean;
  selectedProducts: any = [];
  userDialog!: boolean;
  city: string = "";
  user: any;
  selectedCity1: any;
  gender: any[] = [{ name: 'male' }, { name: 'female' }];
  selectedGender: any = null;
  token = "80d0a1d1baf7f7c79f81427d40faec641c51cb495e1ccd34fddf55ea33bd8dca"

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  }
  constructor(private messageService: MessageService,private router : Router,private activerouter :ActivatedRoute, private confirmationService: ConfirmationService, private http: HttpClient, private ref: ChangeDetectorRef) {

  }



  ngOnInit(): void {
    this.getUser()
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;

  }
  getUser() {
    this.http.get(`${environment.apiEndPoint}`, this.httpOptions).subscribe((res) => {
      this.users = res
    })
  }
  addUser() {
    debugger
    const auser: any = {
      "name": this.user.name,
      "email": this.user.email,
      "gender": this.user.gender,
      "status": this.user.status
    }
    this.http.post(`${environment.apiEndPoint}`, auser, this.httpOptions).subscribe((res: any) => {
      console.log(res)
      this.users = res
      this.getUser()
    })
  }
  // editUser(id:any){
  //   debugger
  //   this.userDialog=true
  // this.user.patchValue({
  //   name : udata.name,
  //   email : udata.email,
  //   gender : udata.gender,
  //   status : udata.status,
  // })
  // this.http.get(`${environment.apiEndPoint}+${id}`).subscribe((res:any)=>{
  //   this.users = res
  // })
  // }

  editUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }
  saveProduct() {
    debugger
    this.userDialog = false;
    if (this.user.id) {
      // this.updateUser()
      this.users[this.findIndexById(this.user.id)] = this.user; 
    } else {
      this.addUser()
    }

  }

//   updateUser() {
// this.http.put(`${environment.apiEndPoint}`,this.httpOptions).subscribe((res:any)=>{
//   this.users = res
// })
//   }
  
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
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
  deleteuser(id: any) {
    debugger
    console.log("user",id)
    this.confirmationService.confirm({
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`${environment.apiEndPoint}/${id}`, this.httpOptions).subscribe((res: any) => {
          this.users = this.users.filter((val: any) => val.id !== id.id);
      this.getUser()
        })
      }
    });
  }
  filterid(id:any){
    this.router.navigate(['/view'] , {
      queryParams : {
          id : id
      }
  })
  }
}
// deleteuser(user: any) {
//   this.confirmationService.confirm({
//     header: 'Confirm',
//     icon: 'pi pi-exclamation-triangle',
//     accept: () => {
//       this.users = this.users.filter((val: any) => val.id !== user.id);
//       // this.user = {};
//       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//     }
//   });
// }