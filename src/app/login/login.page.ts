import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rutstorage: string = "";
  contstorage: string = ""; 

  constructor(private navCtrl: NavController,private alertController: AlertController, private storage: Storage) { }

  async ngOnInit() {
    try {
      this.rutstorage = await this.storage.get('rut');
      this.contstorage = await this.storage.get('contrasena');
    } catch (error) {
      console.error('Error al obtener datos del almacenamiento:', error);
    }
    }
   

  login(){

    const rutInput = document.getElementById('rut') as HTMLInputElement;
    const rut = rutInput.value.trim();

    const contrasenaInput = document.getElementById('contrasenadd') as HTMLInputElement;
    const contrasena = contrasenaInput.value.trim();

    //const rutlocal = localStorage.getItem('rut');
    //const contlocal = localStorage.getItem('contrasena');
    console.log("------------")
    console.log(rut)
    console.log(contrasena)
    console.log(this.rutstorage)
    console.log(this.contstorage)
  

    if(rut != "" && contrasena !=""){
      if( rut === this.rutstorage && contrasena===this.contstorage){
        this.qrcode();
      }else{
        this.presentAlert();
      }
  
    }else{
      this.presentAlert();
    }
   
  }

  qrcode(){
    this.navCtrl.navigateForward('/qrcode');
  }

  backtohome() {
    this.navCtrl.navigateForward('/home');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Credenciales incorrectas, por favor verifique información.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
}
