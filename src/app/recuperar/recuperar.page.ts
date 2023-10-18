import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  nombre: string= '';

  contrasenad: string = '';
  confirmarc: string = '';

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  ngOnInit() {
    this.nombrec();
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
      localStorage.setItem("contrasena",confirmar);
      console.log("si");
      this.limpiar();
      this.passAlert();
      this.backtohome();
  
    }else{
      this.presentAlert();
    }
  }
  nombrec(){
    const nombre1 = localStorage.getItem('nombrealumno');
    this.nombre = 'Nombre Alumno: ' + nombre1;
  }
  backtohome() {
    this.navCtrl.navigateForward('/home');
  }
  


}
