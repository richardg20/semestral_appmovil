import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController,private alertController: AlertController) { }

  ngOnInit() {
  }

  login(){

    const rutInput = document.getElementById('rut') as HTMLInputElement;
    const rut = rutInput.value.trim();

    const contrasenaInput = document.getElementById('contrasenadd') as HTMLInputElement;
    const contrasena = contrasenaInput.value.trim();

    const rutlocal = localStorage.getItem('rut');
    const contlocal = localStorage.getItem('contrasena');

    console.log(rut)
    console.log(rutlocal)
    console.log(contrasena)
    console.log(contlocal)
  
    if(rut===rutlocal && contrasena===contlocal){
      this.qrcode();
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
