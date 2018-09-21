import { Component, OnInit } from '@angular/core';

//Importando el componente 'task'.
import { Task } from '../../models/task';
//Importando los servicios.
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  //Se crea un arreglo donde estaran las publicaciones
  tasks: Task[];
  //para usar el el servi creado se añade al constrctor
  constructor(public postService : PostService) { }


  //es el primer metodo que se ejecuta cuando el componente carga
  //con el vamos a llamar la collec de FB para usarla
  ngOnInit() {
    this.postService.getPublis().suscribe(publis => {
      // console.log(publis);
      this.tasks = publis;
      
    })
  }

}
