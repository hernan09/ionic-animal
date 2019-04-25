import { Component } from '@angular/core';
//importo los documentos para recorrerlos
import { ANIMALES } from "../../data/data.animales"

import { animal } from 'src/interface/animal.interface';
import { element } from '@angular/core/src/render3';
import { from } from 'rxjs';
import { IonRefresher } from '@ionic/angular';

@Component({
  
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales:animal[]=[];
  audio=new Audio();
  audioTiempo:any;


  constructor(){
    /*el splice se hace para crear una copia de del documento animales*/ 
    this.animales=ANIMALES.slice(0);
   

   
  }
  reproducir(animal:animal){

    this.pausar_audio( animal );
    if(animal.reproduciendo){
      animal.reproduciendo=false
      return;
    }
    
    this.audio.src=animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo=true;
    

   this.audioTiempo=setTimeout(()=>animal.reproduciendo=false, animal.duracion*1000);
  }
  private pausar_audio(animalSelelec:animal){
       clearTimeout(this.audioTiempo);
       this.audio.pause();
       this.audio.currentTime=0;

       for (let animal of this.animales){
         animal.reproduciendo=false;
       }
  }
  borrar_animal(idx:number){
    this.animales.splice(idx,1);
  }

  recargar_animales(event:any){
    console.log('inicio el refresh')

      setTimeout(()=>{

       console.log('termino el refresh')

            this.animales=ANIMALES.slice(0);

           

            event.target.complete();

      },1500)
  }
  reorder(event:any){
    console.log(event);
    const itemMover = this.animales.splice(event.detail.from,1)[0];
    this.animales.splice(event.detail.to,0,itemMover);
    event.detail.complete();
  }

}
