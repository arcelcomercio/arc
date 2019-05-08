## Consideraciones para refactorización de Features

1. La clase que identifica a los componentes hijos del Feature ubicados en `_children` deberán ser modificadas en base a la siguiente nomenclatura: `[nombre del padre]Child[nombre del componente]` Ej: `TripletChildTriplet` o `NewsletterChildConfirmation`
1. No se harán modificaciones en las hojas de estilos ni clases asociadas por ahora.
1. Si este Feature tiene componentes hijos, deben ser puestos en el subdirectorio `_children`, debe tener un nombre coherente, sin camelCase, sin letras mayúsculas, separando las palabras con guión `-` y formato `.jsx`.
1. Si este Feature tiene alguna otra dependencia como campos personalizados o un filtro de schema, estos archivos debe ser puestos en el subdirectorio `_dependencies`, deben tener un nombre coherente en _inglés_, sin camelCase, sin letras mayúsculas, separando las palarbas con guión `-` y en formato `.js`(Ej: `custom-fields.js` , `schema-filter.js`).
1. Si el Feature extiende de `Component` pero no tiene más partes del ciclo de vida que `render()`, `ComponentDidMount()` deberá extender de `PureComponent`.
1. Se deben eliminar los comentarios que deshabilitan `eslint` y solucionar el error o sugerencia que estaba siendo oculto.
1. Si los estilos del Feature no están ubicadas dentro del objeto `classes` justo luego de los `import...`, deben hacerlo, es nuestro estándar. No se compliquen con las clases tienen lógica.
1. Tomen en consideración `.label` para agregar el nombre en _español_ que desean sea visto por el editor en PageBuilder.
1. Tomen en consideración `.static = true` en caso de que el Feature no sufra cambios de forma dinámica del lado del cliente, así no hace re-hydrate en cliente, viene 100% listo desde servidor.
1. Recuerda que al modificar una dependencia o children debes modificar la ruta de su llamado y el nombre con el que se importa y es renderizado.
1. Modificar la clase que identifica al Feature (Los nombres están definidos en el excel).
