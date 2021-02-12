# ionicPush

proyecto que tiene como objetivo manejar notificaciones, almacenarlas en el dispositivo y demas
es de destacar que para este proyecto el app.component debe llamar al metodo initializeApp() en el constructor 

para el desarrollo de este tipo de proyectos, es mejor porbarlos directo en el dispositivo

*Nota:* no comprendi bien, pero al desinstalar la app e instalarla de nuevo no llegaban las notificaciones, ademas vi que los 'Estimated recipients o Destinatarios estimados' seguia siendo '1', para quitar ello fui a https://app.onesignal.com/apps/912c2d62-2394-45ac-a68e-ffb1bfa908fe/players y elimine mi dispositivo. desinstale e instale la app de nuevo corriendo con ionic serve y funciono
## Pasos de creacion de proyecto

1. se debe registrar en la pagina https://app.onesignal.com/apps/new?isFirstLogin=true#, yo lo estoy con la cuenta google, tambien debemos crear un proyecto, le damos un nombre y seleccionamos que sera android en este ejemplo, no seguimos configurando nada mas, y nos vamos a la seccion de *keys y id*, alli estan nuestras credenciales, usaremos la que diga *ONESIGNAL APP ID* en el paso 5 de este ejemplo

2. para este ejemplo se necesita ir a firebase, https://console.firebase.google.com/u/0/, estando en esa seccion debemos seleccionar algun proyecto existente o crear uno nuevo, luego de estar en el presionar en el engranaje de project overview *configuracion de proyecto*, nos quedamos en la opcion de *cloud messaging*. copiamos el id del remitente para usarlo en el paso 5 de este ejemplo

3. en ionic se debe instalar el plugin nativo de https://ionicframework.com/docs/native/onesignal , no olvidemos que para la instalacion del plugin debemos colocar en el provider del app.module import { OneSignal } from '@ionic-native/onesignal/ngx'; 

4. debemos crear un servicio, y en él un metodo para tener la configuracion inicial del proyecto, la misma esta de ejemplo en : *https://ionicframework.com/docs/native/onesignal* las key, que alli se muestran son de ejemplo, debemos colocar unas nuestras

5. Cuando realizamos la configuracion del oneSignal, nos da de ejemplo esto *this.oneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');*, esas key deben buscarse, la primera es el id de la app que nos dieron en al paso 1, la segunda clave es la clave de un proyecto firebase, que nos da el paso 2 de este ejemplo

*configuracion de oneSignal en android*

- debemos ir a settings, platforms *https://app.onesignal.com/apps/b6518bfc-3dd3-4297-a35c-1e0d92779a01/settings* seleccionamos google android, alli debemos introducir las credenciale(s) que tenemos en nuestro firebase, al darle next nos pregunta la plataforma, seleccione 'Phonegap, Cordova e Ionic' por que ionic


- debemos montar nuestra app en un telefono, lyuego de hacerlo podemos ir a *https://app.onesignal.com/apps/b6518bfc-3dd3-4297-a35c-1e0d92779a01/campaigns* para enviar un mensaje desde onesignal, presionamos push, *podemos crear una categoria se deseamos*

- en el menu superior la pagina de onesignal podemos ver 'message' alli podemos enviar mensajes a nuestro dispositivo para probar


- luego de todo debemos instalar https://ionicframework.com/docs/native/sqlite y https://ionicframework.com/docs/angular/storage  *npm install --save @ionic/storage* para que almacene las notificaciones en el dispositivo

- sin olvidar colocar en los providers del app.module los plugins instalados 'storage'


******* IMPORTANTE **********

SI NO TIENE CUENTA EN LA TIENDA DE APPLE IOS Y UNA COMPUTADORA MAC, NO PODRA REGISTRAR LO DEL ONESIGNAL PARA LAS NOTIFICACIONES


## URL DE LOS ENDPOINT DE ONESIGNAL para emitir notificaciones desde postman o desde un backend nuestro

### enviar notificacion a todos los usuarios

https://documentation.onesignal.com/reference/create-notification#create-notification

ejemplo enviar notificacion POSTMAN

url     =>  https://onesignal.com/api/v1/notifications
metodo  =>  POST

CABECERA

Authorization Basic Yzg0OWRjOTMtZmE2NC00NDBlLTk2YmQtN2YyY2ZhN2Y2ZDAw

en el body, no como form sino como raw 
{
    "app_id": "912c2d62-2394-45ac-a68e-ffb1bfa908fe",
    "included_segments": ["Active Users", "Inactive Users"],
    "data":{"lo_que_sea": "mas cosas"},
    "contents":{"en":"content en ingles", "es":"Contenido en español" },
    "headings":{"en":"en title ingles", "es":"titulo en español" }

}

### enviar notificacion a un usuario en particular por id

*Documentacion:* https://documentation.onesignal.com/reference/create-notification#section-send-to-specific-devices

para realizar esta tarea, los pasos son igual a enviar las notificaciones por lote, con la diferencia de que en este caso no se envia el included_segments, y se agrega *include_player_ids*

url     =>  https://onesignal.com/api/v1/notifications
metodo  =>  POST

Authorization Basic Yzg0OWRjOTMtZmE2NC00NDBlLTk2YmQtN2YyY2ZhN2Y2ZDAw

// "83a7a5ae-9b6d-4ac6-99cb-3b780a798d1a" es el id que le da onesignal a un dispositivo en particular

{
    "app_id": "912c2d62-2394-45ac-a68e-ffb1bfa908fe",
    "data":{"lo_que_sea": "mas cosas"},
    "contents":{"en":"content en ingles", "es":"Contenido en español" },
    "headings":{"en":"en title ingles", "es":"titulo en español" },
    "include_player_ids": ["83a7a5ae-9b6d-4ac6-99cb-3b780a798d1a"]
}
