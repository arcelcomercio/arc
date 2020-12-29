# Resumen 2020 Especial
Este Feature está pensado para ser usado por tiempo limitado.

Se espera una vez se quiera dejar de usar la plantilla destinada 
al uso de este Feature, este feature tambien sea eliminado u oculto, 
al igual que sus estilos y el proceso de generacion de los mismos, para 
reducir peso del bundle final, mejorar tiempos de desarrollo y mejor 
mantenibilidad del repo.

_Recordar que estamos usando versionamiento, por lo tanto, recuperar este 
feature y sus caracteristicas en el futuro, es sencillo._

## Estructura
Este feature esta formado por un grupo de componentes hijos en `/_children`.

Este feature sera estatico y la data con consumira se le proveera mediante un 
`CustomField`, en formato `JSON`.

## Estilos
Para los estilos, se ha creado un nuevo `output` exclusivo para la plantilla
que usara este `feature`, con la intencion de evitar agregar estos estilos al 
resto del sitio y agregar estilos del resto del sitio a esta plantilla.

El `output` lo puedes encontrar en `src/websites/elcomercio/resumen-2020.scss`
este archivo tiene los estilos base, como `@font-faces` y `variables`, y ademas 
importa los estilos de los componentes hijos de este feature estatico.

Para construir los estilos para esta plantilla, puedes ejecutar `dev:resumen` o 
`prod:resumen`. De igual forma, el script `prod:resumen` se ejecuta automaticamente 
al ejecutar `prod:all`.

### Aplicacion de estilos
Para que cargue la ruta de estilos correcta, se ha agregado la siguiente validacion 
`arcSite === SITE_ELCOMERCIO && /^\/resumen-2020\//.test(requestUri)` en el archivo 
`components/output-types/_children/styles.jsx` para que asi la hoja de estilos que se 
importe sea `resumen-2020.css`.

