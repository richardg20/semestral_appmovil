import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  nombreprof: string= '';
  sala: string= '';
  hora: string= '';

  nombrealumno: string= '';
  rut: string= '';

  horaActual: string='';
  fechaActual: string='';

  constructor(private navCtrl: NavController, private storage:Storage) { }

  rutstorage: string = "";
  nomnbreAstorage: string = ""; 
  nombrePstorage: string = "";
  salastorage: string = ""; 
  horastorage: string = "";

  async ngOnInit() {
    try {
      this.rutstorage = await this.storage.get('rut');
      this.nomnbreAstorage = await this.storage.get('nombre');
      this.nombrePstorage = await this.storage.get('nombrealumno');
      this.salastorage = await this.storage.get('sala');
      this.horastorage = await this.storage.get('hora');
    } catch (error) {
      console.error('Error al obtener datos del almacenamiento:', error);
    }
    }
   
  backtohome() {
    this.navCtrl.navigateForward('/home');
  }
  

  infoclase(){
    const nombre = localStorage.getItem('nombre');
    const hora = localStorage.getItem('hora');
    const sala = localStorage.getItem('sala');
    const alumno =localStorage.getItem('nombrealumno');
    const rut = localStorage.getItem('rut');

    this.nombreprof = ''+nombre;
    this.hora = ''+hora;
    this.sala = ''+sala;
    this.nombrealumno='Nombre alumno: '+alumno;
    this.rut='Rut alumno: '+rut;
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
