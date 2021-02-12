import { ApplicationRef, Component, OnInit } from '@angular/core';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { PushService } from '../servicios/push.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mensajes: OSNotificationPayload[] = [];
  constructor( private pushService:PushService,
    private applicationRef:ApplicationRef
      ) {}

  ngOnInit() {
    this.pushService.escuchaNotificaciones.subscribe((noti)=>{
      this.mensajes.unshift(noti);
      // la siguiente linea es de angular y le dice a angular que realice el ciclo de deteccion de cambios nuevamente, ello nos sirve para asegurarnos que la lista de notificaciones si tenemos la app abierta, se actualice
      this.applicationRef.tick();
    });
  }

  async borrarTodosLosMensajes() {
    await this.pushService.borrarTodosLosMensajes();
    this.mensajes = [];
  }

  async ionViewWillEnter() {
    console.log('cargando mensajes');

    this.mensajes = await this.pushService.getMensajes();
  }
}
