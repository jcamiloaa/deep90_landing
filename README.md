# DEEP90: Análisis futbolístico simple, directo y sin complicaciones

Deep90 es una plataforma de análisis de fútbol que utiliza inteligencia artificial para ofrecer estadísticas, predicciones y análisis táctico directamente a través de WhatsApp. El objetivo es simplificar el acceso a información futbolística de calidad para los aficionados.

## Características principales

- **Alertas en tiempo real**: Recibe notificaciones de goles y momentos clave del partido al instante.
- **Estadísticas claras**: Datos relevantes presentados de forma comprensible y sin tecnicismos innecesarios.
- **Predicciones precisas**: IA que genera pronósticos confiables explicados de manera sencilla.
- **Comunidad informada**: Conéctate con otros aficionados y comparte opiniones respaldadas por datos reales.

## Planes disponibles

- **Fan Básico**: Plan gratuito para que nadie se quede fuera de la cancha.
- **Fan VIP**: Plan premium a $5.990/mes para el verdadero hincha analítico.

## Tecnologías utilizadas

Este proyecto está construido con las siguientes tecnologías:

- HTML5, CSS3, JavaScript
- Bootstrap 5
- Pug (antes Jade) para plantillas HTML
- SCSS para estilos
- Node.js para automatización del desarrollo

## Instalación y configuración

1. Clona este repositorio: `git clone [URL del repositorio]`
2. Navega al directorio del proyecto: `cd deep90_landing`
3. Instala las dependencias: `npm install`
4. Para iniciar el servidor de desarrollo: `npm start`
5. Para compilar los archivos para producción: `npm run build`

## Scripts disponibles

- `npm run build`: Construye el proyecto completo en la carpeta `dist`
- `npm run build:assets`: Copia los archivos de assets al directorio de distribución
- `npm run build:pug`: Compila los archivos Pug a HTML
- `npm run build:scripts`: Procesa los archivos JavaScript
- `npm run build:scss`: Compila los archivos SCSS a CSS
- `npm run clean`: Elimina el directorio de distribución
- `npm start`: Inicia el servidor de desarrollo con recarga en vivo

## Estructura del proyecto

- `src/`: Contiene los archivos fuente del proyecto
  - `assets/`: Imágenes y otros recursos estáticos
  - `css/`: Archivos CSS generados
  - `js/`: Scripts de JavaScript
  - `pug/`: Plantillas Pug
  - `scss/`: Archivos de estilos SCSS
- `scripts/`: Scripts de Node.js para la construcción del proyecto
- `dist/`: Archivos generados para producción (creado al construir)

## Contacto

Para más información sobre Deep90, contáctanos a través de WhatsApp al [+57 322 709 1047](https://wa.me/573227091047?text=Hola%20Deep90) o visita nuestro sitio web.

## Copyright y licencia

Copyright 2025 BuzztIA. Todos los derechos reservados.


### Despliegue con PowerShell

Para el script PowerShell:

- Haz clic derecho en `deploy.ps1` y selecciona "Ejecutar con PowerShell".
- O abre PowerShell y ejecuta:

```powershell
.\deploy.ps1
```

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass .\deploy.ps1