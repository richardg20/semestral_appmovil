import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  nombre: string= '';
  nombre2: string= '';

  contrasenad: string = '';
  confirmarc: string = '';

  constructor(private alertController: AlertController, private navCtrl: NavController, private storage: Storage) {}

  async ngOnInit() {
    this.nombre2 = await this.storage.get("nombrealumno");
    this.nombre = 'Nombre Alumno: ' + this.nombre2;

  }


  
  limpiar(){
    this.contrasenad = '';
    this.confirmarc = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'La nueva contraseña debe ser igual en ambos apartados.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async passAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Contraseña recuperada correctamente.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }


  confirmar(){
    const confirmarInput = document.getElementById('confirmarc') as HTMLInputElement;
    const confirmar = confirmarInput.value.trim();

    const contrasenaInput = document.getElementById('contrasenad') as HTMLInputElement;
    const contrasena = contrasenaInput.value.trim();
    
    console.log(confirmar);
    console.log(contrasena);

    if(contrasena===confirmar){

      //localStorage.setItem("contrasena",confirmar);
      this.storage.set("contrasena",confirmar);
      
      this.limpiar();
      this.passAlert();
      this.backtohome();
  
    }else{
      this.presentAlert();
    }
  }

  backtohome() {
    this.navCtrl.navigateForward('/home');
  }
  


}
