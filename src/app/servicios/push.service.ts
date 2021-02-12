import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/Storage';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  /*mensajes: any[] = [{
    title: 'Titulo de la push',
    body: 'El body de la push',
    date: new Date()
  }];*/

  mensajes: OSNotificationPayload [] = [];
  userId:string = '';
  escuchaNotificaciones = new EventEmitter<OSNotificationPayload>();

  constructor(
    private oneSignal: OneSignal,
    private storage: Storage
    ) {
      this.cargarMensajes();
    }

  async getMensajes() {
    await this.cargarMensajes();
    // la siguiente linea envia el array de mensajes, creando un nuevo array y enviandolo, para que no tenga referencia al array actual del servicio
    return [...this.mensajes];
  }

  configuracionInicial() {
    console.log('enrto al servicio, metod: configuracionInicial');

    this.oneSignal.startInit('912c2d62-2394-45ac-a68e-ffb1bfa908fe', '718962391597');
    // la anterior linea comentada, es por que de esta manera nos muestra un alert, y no lo queremos asi para este ejemplo
    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification );
    this.oneSignal.handleNotificationReceived().subscribe((info) => {
    // que hacer cuando reciba la notificacion
    console.log('Notificacion Recibida', info);
    this.notificacionRecibida(info);
    });

    // a la siguiente seccion se le coloco la palabra async para que espere y ejecute las tareas completas
    this.oneSignal.handleNotificationOpened().subscribe( async (info) => {
      // cuando la notificacion es abierta
      console.log('Notificacion abierta', info );
      // esta seccion es para especificar que acciones quiero que realice la app cuando presionen la notificacion, asi la app este cerrada en el telefono
      await this.notificacionRecibida(info.notification);

    });


    // inicio del bloque usado para identificar a cada usuario de manera independiente con el id, el mismo nos lo da onesignal
    //obter el ID del suscriptor
    this.oneSignal.getIds().then(info=> {
      this.userId = info.userId;
      // este user id nos sirve para enviarle notificaciones a un dispositivo en especifico
      console.log('userId:', this.userId);

    });
    // fin del bloque usado para identificar a cada usuario de manera independiente con el id, el mismo nos lo da onesignal

    this.oneSignal.endInit();
  }

  // este metodo es para lo que haremos cuando recibamos la notificacion
  // OSNotification es una interfaz de onesignal que nos ayuda con las sugerencia sobre las propiedades de la notificacion recibida
  async notificacionRecibida(notificacion: OSNotification) {
    await this.cargarMensajes();
    const payload = notificacion.payload;
    // para ver si la notificacion ya existe en mi array de notificaciones
    const existePush = this.mensajes.find((mensaje)=>mensaje.notificationID === payload.notificationID );
    if(existePush) {
      return;
    }
    this.mensajes.unshift(payload);
    console.log(this.mensajes);

    // esta linea es para crear un observable que informe al listado que tengo en home.page.ts cada vez que tengo una notificacion nueva y la app esta abierta, es para que actualice el listado
    this.escuchaNotificaciones.emit(payload);
    await this.guardarMensajes();
  }

  guardarMensajes() {
    this.storage.set('mensajes', this.mensajes);
  }

  async cargarMensajes() {
    // si en el storage esta vacio entonces retorna un array vacio
    this.mensajes = (await this.storage.get('mensajes')) || [];
  }
  async borrarTodosLosMensajes() {
    await this.storage.clear();
    this.mensajes = [];
    // luego de borrar los mensajes guardar el array vacio en el storage
    this.guardarMensajes();
  }
}
