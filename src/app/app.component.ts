import { Component } from '@angular/core';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userListService: UserListService) { }

  title = 'our-users';
  users = [];
  url: string;
  sortOrder: string;

  ngOnInit() {
    this.getUsers();
    this.url = "assets/img/sample-group.png";
  }

  getUsers(){
    this.userListService.getUsersFromServer().subscribe(users => {
      users.map(userItem =>{
        userItem.isSelected = false;
        this.users.push(userItem);
      });
      this.sortOrder = "1";
      this.sortUsers();
    },
    error=>{
      this.userListService.getUsersfromJSON().subscribe(users => {
        users.map(userItem =>{
          userItem.isSelected = false;
          this.users.push(userItem);
        });
        this.sortOrder = "1";
        this.sortUsers();
      });
    });
  }

  sortUsers(){
    if(this.sortOrder == "1"){
      this.users = [...this.users.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)]
    }
    else{
      this.users = [...this.users.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1)]
    }
  }

  onSelectFile(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result.toString();
        }
      }
  }

}
