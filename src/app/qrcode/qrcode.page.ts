import { Component, OnInit } from '@angular/core';
import { Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

    
  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];
  public cameraActive = true;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  gotomain(){
    //
    this.navCtrl.navigateForward('/main');
    
  }

  
  backtohome() {
    this.navCtrl.navigateForward('/home');
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  desactivarCamara() {
    this.cameraActive = false;
    this.scannerEnabled = false;
    console.log('estweafunciona')
  }

  scanSuccessHandler(event:string){

    //console.log(event);
    //this.results.unshift(event);
    let info = event.split(',');

    var nombreprofe = info[0];
    var horaclase = info[1];
    var sala= info[2];

    localStorage.setItem('nombre',nombreprofe);
    localStorage.setItem('hora',horaclase);
    localStorage.setItem('sala',sala);


    console.log(info[0]);
    console.log(info[1]);
    console.log(info[2]);

    this.gotomain()
    this.desactivarCamara();
  }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
  }

  
}



