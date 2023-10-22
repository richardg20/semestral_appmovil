import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  login: number=1;

  constructor( private storage: Storage, private navCtrl: NavController) { }

  async ngOnInit() {
    Camera.checkPermissions()
    this.storage.create();
    this.storage.set("login",this.login);
  }

  async takeSelfie() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      await this.storage.set('capturedImage', 'data:image/jpeg;base64,' + image.base64String);

    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
    this.main();
  }

  main(){
    this.navCtrl.navigateForward('/main');
  }

}
