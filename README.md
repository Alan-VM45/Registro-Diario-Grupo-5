# Programacion-3-grupos

## ExpenseTracker

Prototipo inicial de ExpenseTracker construido con React Native y Expo, preparado
para ejecutarse desde Expo Go. Permite consultar un resumen, filtrar movimientos y
registrar gastos de ejemplo durante la sesion.

## Requisitos

- Node.js LTS y npm. En este equipo se detecto Node.js 22.19.0 y npm 10.9.3.
- Visual Studio Code.
- Expo Go instalado en un telefono Android o iPhone.

Descarga Expo Go desde [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
o desde la [App Store](https://apps.apple.com/app/expo-go/id982107779).

No hace falta instalar Android Studio, un emulador, Xcode ni CocoaPods para probar
esta app con Expo Go. Expo administra el entorno nativo. Para compilar directamente
para iOS con React Native CLI si se necesita una Mac con Xcode; para Android se
necesitan Android Studio, el SDK y un AVD. Esa ruta nativa no es la que usamos aqui.

## Ejecutar en Expo Go

Desde la carpeta del proyecto, abre una terminal y ejecuta:

```powershell
npm install
npm start
```

Metro mostrara un codigo QR. Conecta el telefono y la computadora a la misma red
Wi-Fi y escanea el QR desde Expo Go en Android o con la camara del iPhone. La
terminal debe permanecer abierta mientras usas la aplicacion.

Si la red o el firewall de Windows impiden la conexion local, inicia Expo con el
tunel:

```powershell
npx expo start --tunnel
```

## Archivos principales

- `App.js`: componente raiz y punto de partida para construir pantallas.
- `index.js`: registra el componente raiz para Expo.
- `app.json`: nombre, identificador, orientacion, iconos y ajustes de plataforma.
- `package.json`: dependencias y comandos disponibles (`npm start`, `npm run android`,
  `npm run ios` y `npm run web`).
- `assets/`: iconos e imagenes de la aplicacion.
- `src/screens/`: vistas de resumen, movimientos y alta de gastos.
- `src/components/`: componentes compartidos, como las filas de gastos y las pestanas.
- `src/data.js`: categorias, movimientos de muestra y formato de moneda.

En el flujo gestionado de Expo no aparecen las carpetas `android/` e `ios/` al
iniciar. Expo las administra hasta que el proyecto necesite codigo nativo propio.

## Depuracion

Con Metro en ejecucion, presiona `j` en la terminal para abrir React Native DevTools.
Desde alli puedes revisar la consola, el arbol de componentes, las solicitudes de red
y el codigo fuente. Fast Refresh actualiza la app al guardar cambios; los errores y
avisos de desarrollo aparecen en LogBox.

En un telefono tambien puedes abrir el menu de desarrollo con el gesto de agitar el
dispositivo. Fast Refresh refleja los cambios al guardar.

## Sprint 1

- **Resumen:** total del mes, presupuesto, disponible, categorias y movimientos recientes.
- **Movimientos:** lista de gastos con filtros por categoria.
- **Agregar:** formulario con concepto, importe y categoria; al guardar, el gasto aparece
    en la lista y actualiza el resumen.

Los datos son de ejemplo y se mantienen solo en memoria mientras la app esta abierta.
Todavia no se usa base de datos, Context ni una API, de acuerdo con el alcance del sprint.

## Capturas de Expo Go

Agregar aqui capturas reales de las pantallas Resumen, Movimientos y Agregar ejecutandose
en el telefono con Expo Go. Esas capturas se deben tomar desde el dispositivo.