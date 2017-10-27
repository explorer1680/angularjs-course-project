import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
// import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    // authService2 : AuthService;

    constructor(private dataStorageService: DataStorageService, 
        // public authService: AuthService,
        private store: Store<fromApp.AppState>){}

    onSaveData(){
        this.dataStorageService.storeRecipes().subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    onFetchData(){
        // this.dataStorageService.getRecipes();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnInit(){
        // this.authService2 = this.authService;
        this.authState = this.store.select('auth')
    }
}