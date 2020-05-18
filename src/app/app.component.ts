import { Component } from '@angular/core';
import { NotificationService } from './services/notification/notification.service';
import { ProgressService } from './services/progress/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode = 'determinate'
  title = 'E-shop';
  
  value = 0;

  constructor(private loading : ProgressService){
    this.loading.loaderObservable.subscribe(
      (result)=>{
       this.mode =  (result) ? 'indeterminate' : 'determinate'
      }
    )
  }





  


 
}
