# ionicPush

## Pasos de creacion de proyecto

1. se debe registrar en la pagina https://app.onesignal.com/apps/new?isFirstLogin=true#, yo lo estoy con la cuenta google

2. para este ejemplo se necesita ir a firebase, https://console.firebase.google.com/u/0/, estando en esa seccion debemos seleccionar algun proyecto existente o crear uno nuevo, luego de estar en el presionar en el engranaje de project overview *configuracion de proyecto*, nos quedamos en la opcion de *cloud messaging*

3. en ionic se debe instalar el plugin nativo de https://ionicframework.com/docs/native/onesignal , no olvidemos que para la instalacion del plugin debemos colocar en el provider del app.module import { OneSignal } from '@ionic-native/onesignal/ngx'; 

4. debemos crear un servicio, y en él un metodo para tener la configuracion inicial del proyecto, la misma esta de ejemplo en : *https://ionicframework.com/docs/native/onesignal* las key, que alli se muestran son de ejemplo, debemos colocar unas nuestras

5. 
