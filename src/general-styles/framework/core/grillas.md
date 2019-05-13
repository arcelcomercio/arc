## Grillas

#### La intención de este documento es dar a conocer las bases del sistema de grillas propio que estamos implementando para la construcción de los sitios web con ARC.

La grilla de contenido principal está compuesta de tres columnas. En total esta grilla debe tener un ancho máximo de 1024px y un ancho mínimo de 940px (900px + 20px por cada márgen entre elementos), por otra parte, el alto de esta grilla y de sus filas son dinámicos, por tanto, se creará una nueva fila del mismo alto del elemento que se agregue, cada vez que se agregue un elemento (Si este elemento no cabe en la fila previa).

---

### Flujo de contenido

Toda grilla de contenido se rellenará siempre siguiendo el mismo flujo, de izquierda a derecha y de arriba hacia abajo.

##### _Ej: Tomando en consideración una grilla de tres columnas, al agregar un elemento de 1x1 aún quedan dos columnas disponibles en la primera fila. Si se agrega un elemento adicional de 2x1, la primera fila estará completamente rellena por esos dos elementos. Al momento de agregar un nuevo elemento que ocupe cualquier cantidad de columnas, este se ubicará en una nueva fila porque ya no tiene espacio en la primera._

---

### Establecer tamaños a componentes

La grilla define el la estructura por la que se regirán los elementos que sean agregados dentro de ella. En este sentido, los elementos que se incluirán en las grillas deben tener definido que espacio ocupar dentro de la grilla _(1, 2 o 3 Columnas; 1, 2, 3, 4 o infinitas filas)._ Para lograr este cometido se han establecido unas clases que, al ser asignadas a un componente, le asignan el tamaño preciso dentro de la grilla.

**Clases disponibles**

- .col-1 : El elemento ocupará sólo una columna de ancho.
- .col-2 : El elemento ocupará dos columnas de ancho.
- .col-3 : El elemento ocupará tres columnas de ancho.
- .row-1 : El elemento ocupará sólo una fila de alto.
- .row-2 : El elemento ocupará dos filas de alto.
- .row-3 : El elemento ocupará tres filas de alto.
- .row-4 : El elemento ocupará cuatro filas de alto.

**Tamaños de Columnas**

El tamaño mínimo de las columnas es de 300px, esto para lograr un buen acoplamiento de los espacios publicitarios. El tamaño máximo de las columnas en desktop será de 328px. En tablet y mobile el ancho de las columnas será variable dependiendo de la resolución del dispositivo.

**Tamaños de las filas**

Las filas en la grilla de contenido principal, grid--box y content--infinite tendrán un alto de 374px cada una, sin embargo, en chains de contenido como grid--col-1, grid--col-2, grid--col-3 el alto de las filas no está definido, cada fila que se genere tendrá el alto del elemento más grande contenido en esa fila.

---

### Grillas de contenido disponibles:

- **Grilla de contenido principal (Layout):** Esta tiene tres columnas, cantidad de filas indefinidas y tamaño de filas indefinido. Está definida en el Layout, por tanto no puede ser modificada desde el Page Builder. Será la que albergue el resto del contenido (Features y otros chains dejando fuera al header, footer y zócalos).

Usa las siguientes clases:

    'content--grid-base',
    'content-layout',
    'grid--col-1',
    'grid--col-2',
    'grid--col-3',
    'margin-top'

- **Damero, Content-box (Chain):** Esta grilla tiene un espacio completamente definido e inmutable, tres columnas y cuatro filas, cada fila de 374px. Es un Chain, por tanto puede contener otros Features en su interior y esto se puede hacer desde el Page Builder. Esta pensada para ser usada en la Homepage de los sitios para poder delimitar por secciones.

Usa las siguientes clases:

    'content--grid-base',
    'content-layout',
    'grid--box',
    'grid--col-1',
    'grid--col-2',
    'grid--col-3',
    'col-3'

- **Grilla de tres columnas, Content-3col (Chain):** Esta grilla tiene tres columnas, cantidad de filas indefinidas y tamaño de filas indefinido. El alto de cada fila estará definido por el alto máximo de los componentes internos. Es un Chain, por tanto puede contener otros Features en su interior y esto se puede hacer desde el Page Builder. Ideal para agrupar de forma horizontal algunos Features sin que se rompa el orden o como "separador".

Usa las siguientes clases:

    'content--grid-base',
    'grid--col-1',
    'grid--col-2',
    'grid--col-3',
    'col-3'

- **Grilla de dos columnas, Content-2col (Chain):** Esta grilla tiene dos columnas, cantidad de filas indefinidas y tamaño de filas indefinido. El alto de cada fila estará definido por el alto máximo de los componentes internos. Es un Chain, por tanto puede contener otros Features en su interior y esto se puede hacer desde el Page Builder. Ideal para páginas donde el contenido se acompañará por una Sidebar con otros Features o publicidad, por ejemplo, en el cuerpo de una historia.

Usa las siguientes clases:

    'content--grid-base',
    'grid--col-1',
    'grid--col-2',
    'col-2'

- **Sidebar (Chain):** Esta grilla tiene una columna, cantidad de filas indefinidas y tamaño de filas indefinido. El alto de cada fila estará definido por el alto máximo de los componentes internos. Es un Chain, por tanto puede contener otros Features en su interior y esto se puede hacer desde el Page Builder. Ideal para insertar publicidad e información adicional de interés para el usuario y así acompañar contenido de dos columnas.

Usa las siguientes clases:

    'content--grid-base',
    'grid--col-1',
    'col-1'

---

### Breakpoints para grillas

- 1024px : 3 Columnas
- 768px : 2 Columnas
- 320px : 1 Columna

**Comportamiento de las clases de grilla con los breakpoints**

- Pantalla => 320px

.col-1, .col-2 y .col-3 adquieren el mismo significado, siempre equivalen a una columna. Así todos los elementos se alinean de forma vertical.

- Pantalla => 768px

.col-2 y .col-3 adquieren el mismo significado, siempre equivalen a dos columnas. Así los elementos de tres columnas reducen su tamaño.

- Pantalla => 1024px

Cada clase de columna adquiere el tamaño definido por defecto correspondiente a su nombre.
