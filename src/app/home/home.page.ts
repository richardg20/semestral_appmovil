import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController, private animationCtrl: AnimationController, private alertController: AlertController, private storage:Storage) {}

  rut: string="";

  async ngOnInit() {
    await this.storage.create();
    this.updateRut();
  }

  ionViewWillEnter() {
    this.updateRut();
  }

  async updateRut() {
    this.rut = await this.storage.get("rut");
    console.log(this.rut);
  }

  iralogin() {

    //const rut =localStorage.getItem('rut');

    if(this.rut!==null){
      this.navCtrl.navigateForward('/login');
    }else{
      this.presentAlert();
    }

    }
    
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'No existen alumnos registrados',
      buttons: ['Aceptar']
    });
    
    await alert.present();
  }

  iraregistro() {
    this.navCtrl.navigateForward('/registro');
  }

  recuperar() {
    //const rut =localStorage.getItem('rut');

    if(this.rut!==null){
      this.navCtrl.navigateForward('/recuperar');
    }else{
      this.presentAlert();
    }

    }

  ionViewDidEnter() {
    this.animateTitle();
  }

  animateTitle() {
    const titleElement = document.querySelector('.animated-title');
    
    if (!titleElement) {
      return;
    }

    const titleAnimation = this.animationCtrl.create()
      .addElement(titleElement)
      .duration(2500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .onFinish(() => {
        titleAnimation.direction('reverse').play();
      });

    titleAnimation.play();
  }


}
