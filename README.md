# proxyvideo
Proxyvideo for web

This proxy permit download video while you browse page, for example

visit webpage with flv,mp4... through this proxy and download video in background mode.

----------------
proxy-http-old-version.js En su momento sirvio para descargar todos los videos de todas las paginas que proveen acceso via http para una mayoria de los formatos de videos de streaming. Luego algunos sitios web cambiarón hacia https y en algunos casos la decarga se interrumpe impidiendo la descarga completa de los videos. 

Libero el código por si alguien le interesa extender el comportamiento y nuevas funcionalidades.

para funcionar requiere tener instalado la versión v0.8.10 y v0.8.28 y compatibles con http_request.

Se agrega versión para funcionar sobre https y con una de las ultimas versiones de nodejs v8.4.0. Se recomienda utilizar de browser a midori 0.5.11 debido a que otros browserver ya tienen soporte nativo detectado por las paginas para activar HTML5=>preload=>metadata-video. 

Si alguien puede modificar el código para funcionar sobre html5 preload video metadata bienvenido sea.

luego verificar las ubicaciones de las carpetas del script para poder lanzarlo desde iniciar.sh.
