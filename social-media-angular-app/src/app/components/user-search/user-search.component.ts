import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserSearchService } from '../../services/user-search.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models/user.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-user-search',
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './user-search.component.html',
    styleUrl: './user-search.component.scss'
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: IUser[] = [];

  private userSearchService = inject(UserSearchService);

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  ngOnInit() {
    this.searchForm
      .get('query')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(async (value) => {
        if (value.length <= 3) return;

        const users = await this.userSearchService.searchUsers(value);
        const result = await this.userSearchService.getUsersFromFirestore(
          users
        );
        this.searchResults = result;
      });
  }
}
