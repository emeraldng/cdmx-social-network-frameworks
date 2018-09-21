import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';

//Importando la config de FireBase
import { environment } from '../environments/environment';
//Importando Firebase.
import { AngularFireModule } from 'angularfire2';
//Importando de Firebase a FireStore.
import { AngularFirestoreModule } from 'angularfire2/firestore';
//Importando los services
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    AddTasksComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule, //Se declara el modulo de AngularFire a array 'imports'.
    AngularFirestoreModule, //También para FireStore
    AngularFireModule.initializeApp(environment.firebase, 'Angular-Meuus') //Importando la conf desde environments
  ],
  //Se añade los services de Post
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
