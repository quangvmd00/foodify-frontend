import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableService } from 'src/app/shared/service/table.service';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/tables/User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListUserComponent implements OnInit {
  users: User[] = [];

  searchForm: FormGroup

  //Pagination Properties
  role: string = 'ROLE_USER'
  thePageNumber = 1;
  thePageSize = 5;
  sortBy = 'id';
  sortDir = 'asc';
  theTotalElements = 0;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchName: ['']
    })

    this.listAllUsers()
  }

  listAllUsers() {
    this.userService.getAllUsersByRole(this.role, this.thePageNumber - 1, this.thePageSize, this.sortBy, this.sortDir)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.users = data.users;
      this.thePageNumber = data.page.pageNo + 1;
      this.thePageSize = data.page.pageSize;
      this.theTotalElements = data.page.totalElements;
    }
  }

  searchUser() {
    console.log(this.searchName)
  }

  onSort(sortItem: string) {
    if (this.sortDir == 'asc') {
      this.sortBy = sortItem;
      this.sortDir = 'desc';
    }
    else {
      this.sortDir = 'asc'
    }
    this.listAllUsers();
  }


  get searchName() { return this.searchForm.get('searchName').value }

}

