import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  userSubs: Subscription = new Subscription();

  isAuthenticated = false;

  collapsed: boolean = true;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs.add(
      this.store.select('auth')
        .pipe(
          map(authState => authState.user)
        )
        .subscribe(user => {
          this.isAuthenticated = !!user;
        })
    );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
