import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  regions: any[] = [];
  comunas: any[] = [];
  selectedRegionId: number = 0;

  region: string='';
  comuna: string='';

  usuario: string= '';
 
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';
  contrasena: string = '';
  
  selectedRegion: string = '';
  selectedComuna: string = '';
  

  constructor(private http: HttpClient, private navCtrl: NavController, private animationCtrl: AnimationController, private alertController: AlertController, private storage: Storage) {}

  
  async ngOnInit() {
    this.getRegions();
    this.storage.create();
  }
  getRegions() {
    this.http.get('https://dev.matiivilla.cl/duoc/location/region').subscribe(
      (response: any) => {
        this.regions = response.data; // Assign the 'data' property
        console.log(this.regions);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  onRegionChange(event: any) {
    this.selectedRegionId = event.detail.value;
    const selectedRegion = this.regions.find(region => region.id === this.selectedRegionId);
    this.selectedRegion = selectedRegion ? selectedRegion.nombre : '';
    console.log("la region es: "+this.selectedRegion)
    this.getComuna();
  }
  getComuna() {
    this.http.get('https://dev.matiivilla.cl/duoc/location/comuna/'+this.selectedRegionId).subscribe(
      (response: any) => {
        this.comunas = response.data; // Assign the 'data' property
        console.log(this.comunas);
        if (this.comunas.length > 0) {
          this.selectedComuna = this.comunas[0].nombre; // Asígnalo al primer elemento por defecto
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }


  backtohome() {
    this.navCtrl.navigateForward('/home');
  }
  

  limpiarcampos(){
    this.nombre = '';
    this.apellido = '';
    this.rut  = '';
    this.carrera = '';
    this.contrasena = '';
  }

  
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Las condiciones no se cumplen. Verifica los datos solicitados.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }


  async regiAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Alumno registrado.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async regiAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Todos los campos son obligatorios',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }



  registro(){
    
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const nombre = nombreInput.value;

    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    const contrasena = contrasenaInput.value;
    
    const apellidoInput = document.getElementById('apellido') as HTMLInputElement;
    const apellido = apellidoInput.value;
    
    const rutInput = document.getElementById('rut') as HTMLInputElement;
    const rut = rutInput.value;

    const rut2 = rut.toString();
    
    const carreraInput = document.getElementById('carrera') as HTMLInputElement;
    const carrera = carreraInput.value;
    
    
    // const comunaInput = document.getElementById('comuna') as HTMLSelectElement;
    // this.selectedComuna = comunaInput.options[comunaInput.selectedIndex].text;
    // console.log(this.selectedComuna)

      if(nombre.length>3 && nombre.length<20){
        if(apellido.length>3 && apellido.length<50){
          if(carrera.length>3 && carrera.length<20){
              if(contrasena.length>2 && contrasena.length<10){
  
                //guardar datos storage
  
                localStorage.setItem('rut',rut2);
                localStorage.setItem('carrera',carrera);
                localStorage.setItem('apellido',apellido);
                localStorage.setItem('contrasena',contrasena);
                localStorage.setItem('nombrealumno',nombre);
                console.log("asasdasd");
  
                this.storage.set("rut",rut2);
                this.storage.set("carrera",carrera);
                this.storage.set("apellido",apellido);
                this.storage.set("contrasena",contrasena);
                this.storage.set("nombrealumno",nombre);
                this.storage.set("region", this.selectedRegion);
                this.storage.set("comuna", this.selectedComuna);
  
                this.limpiarcampos();
                this.regiAlert();
                this.backtohome();
  
              }else{
                console.log("1");
                this.presentAlert();
              }
          }else{
            console.log("3");
            this.presentAlert();
          }
        }else{
          console.log("4");
          this.presentAlert();
        }
      }else{
        console.log("5");
        this.presentAlert();
      }

   
  }//fin clase

  // registrardatos(){
  //   const nombreInput = document.getElementById('nombre') as HTMLInputElement;
  //   const nombre = nombreInput.value;

  //   const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
  //   const contrasena = contrasenaInput.value;
    
  //   const apellidoInput = document.getElementById('apellido') as HTMLInputElement;
  //   const apellido = apellidoInput.value;
    
  //   const rutInput = document.getElementById('rut') as HTMLInputElement;
  //   const rut = rutInput.value;
    
  //   const carreraInput = document.getElementById('carrera') as HTMLInputElement;
  //   const carrera = carreraInput.value;
  //    console.log(nombre);
  //    console.log(contrasena);
  //    console.log(apellido);
  //    console.log(rut);
  //    console.log(carrera);
  //    localStorage.setItem('rut',rut);
  //    localStorage.setItem('carrera',carrera);
  //    localStorage.setItem('apellido',apellido);
  //    localStorage.setItem('contrasena',contrasena);
  //    localStorage.setItem('nombre',nombre);
  // }

}
