import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    authService2 : AuthService;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

    onSaveData(){
        this.dataStorageService.storeRecipes().subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    onFetchData(){
        this.dataStorageService.getRecipes();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnInit(){
        this.authService2 = this.authService;
    }
}