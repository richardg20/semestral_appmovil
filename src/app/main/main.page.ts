import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  login: number=1;

  latitude: number=0;
  longitude: number=0;

  latitudeDMM: string='';
  longitudeDMM: string='';

  capturedImage: string='';

  nombreprof: string= '';
  sala: string= '';
  hora: string= '';

  nombrealumno: string= ''; 
  rut: string= '';

  horaActual: string='';
  fechaActual: string='';

  residencia: string='';

  constructor(private navCtrl: NavController, private storage:Storage, private geolocation:Geolocation) { }

  rutstorage: string = "";
  nomnbreAstorage: string = ""; 
  nombrePstorage: string = "";
  salastorage: string = ""; 
  horastorage: string = "";
  regionstorage: string="";
  comunastorage: string="";

  async ngOnInit() {
    this.storage.create();
    this.storage.set("login",this.login);
      this.rutstorage = await this.storage.get('rut');
      this.nomnbreAstorage = await this.storage.get('nombrealumno');
      this.nombrePstorage = await this.storage.get('nombre');
      this.salastorage = await this.storage.get('sala');
      this.horastorage = await this.storage.get('hora');

      this.regionstorage = await this.storage.get('region');
      this.comunastorage = await this.storage.get('comuna');

      console.log(this.rutstorage)
      console.log(this.nomnbreAstorage)
      console.log(this.salastorage)
      console.log(this.horastorage)
      console.log(this.nombrePstorage)

      const coordinates = await Geolocation.getCurrentPosition();
       this.latitude = coordinates.coords.latitude;
       this.longitude = coordinates.coords.longitude;
  }   
  
  ionViewWillEnter() {
    this.info();
  }

 
  async info() {
  
    this.rutstorage = await this.storage.get('rut');
    this.nomnbreAstorage = await this.storage.get('nombrealumno');
    this.nombrePstorage = await this.storage.get('nombre');
    this.salastorage = await this.storage.get('sala');
    this.horastorage = await this.storage.get('hora');
    this.regionstorage = await this.storage.get('region');
    this.comunastorage = await this.storage.get('comuna');
    this.capturedImage = await this.storage.get('capturedImage');
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    this.latitudeDMM = this.convertToDMM(this.latitude);
    this.longitudeDMM = this.convertToDMM(this.longitude);

    this.infoclase();
  }
  convertToDMM(coordinate: number): string {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutes = (absolute - degrees) * 60;
    const seconds = (minutes - Math.floor(minutes)) * 60;
    return `${degrees}° ${Math.floor(minutes)}' ${seconds.toFixed(2)}"`;
  }

  backtohome() {
    this.storage.set("login",0);
    this.navCtrl.navigateForward('/home');
  }
  

  infoclase(){
    //const nombre = localStorage.getItem('nombre');
    //const hora = localStorage.getItem('hora');
    //const sala = localStorage.getItem('sala');
    //const alumno =localStorage.getItem('nombrealumno');
    //const rut = localStorage.getItem('rut');

    this.nombreprof = ''+this.nombrePstorage;
    this.hora = ''+this.horastorage;
    this.sala = ''+this.salastorage;
    this.nombrealumno='Nombre alumno: '+this.nomnbreAstorage;
    this.rut='Rut alumno: '+this.rutstorage;
    this.residencia='Residencia alumno: '+this.regionstorage+', '+this.comunastorage;
    this.horasystem();
  }

   horasystem(){
      const timestamp = Date.now(); 
      const fecha = new Date(timestamp); 
      const dia = fecha.getDate();
      const mes = fecha.getMonth(); 
      const anno = fecha.getFullYear();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes();

      const horaFormateada = fecha.toLocaleTimeString();

      console.log(`Hora: ${hora}:${minutos}`);
      console.log(`Hora formateada: ${horaFormateada}`);
      console.log(`Doa: ${dia} mes ${mes} anoo: ${anno}`);

      this.fechaActual=`Fecha: ${dia}/${mes}/${anno}`;
      this.horaActual=`Hora de asistencia registrada: ${hora}:${minutos}`;
   }
  
}
