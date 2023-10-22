import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {

  constructor(private navCtrl: NavController, private alertController: AlertController, private storage:Storage,private router: Router) {}


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.storage.create()).pipe(
      switchMap(() => from(this.storage.get("login"))),
      map((login: number) => {
        if (login === 1) {
          return true;
        } else {
          this.presentAlert();
          this.backtohome();
          return false;
        }
      })
    );
  }

  // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
  //   if(this.verlogin()){
  //     return true;
  //   }
  //   else{
  //     this.presentAlert();
  //     this.backtohome();
  //     return false;
  //   }
     
      
  // }

 

   login: number=0;
  
   async ngOnInit(){
     this.storage.create();
     this.login=await this.storage.get("login");
   }

   ionViewWillEnter() {
     this.getdata();
   }
   async getdata(){
     this.storage.create();
     this.login=await this.storage.get("login");
   }

   verlogin(): boolean{
     this.getdata();
     this.ionViewWillEnter();
     if(this.login===1){
       return true;
     }
     else{
       return false;
     }
   }
   backtohome() {
    this.router.navigate(['/home']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
       header: 'Alerta',
      message: 'Debes estar logeado para acceder',
       buttons: ['Aceptar']
     });
    
     await alert.present(); 
   }
}
