### Dimensions

De acá se generan las clases de dimensiones para ancho y altura, con la siguiente estructura.

```
.w-full {
    width: 100%;
}
```

o

```
.h-0 {
    height: 0;
}
```

Las dimensiones disponibles por ahora son: `100%, auto, inherit, 0`.

### Object-fit & pos

Aquí se generan las clases para atributos `object-fit` y `object-position`, con la siguiente nomenclatura.

```
.object-cover {
    object-fit: cover;
}

---

.object-top {
    object-position: top;
}
```

Los valores disponibles para `object-fit` son: `cover y contain`. Los valores disponibles para `object-position` son: `center, top y bottom`.

### Displays

Acá se generan las clases para la propiedad `display`. El nombre de la clase corresponderá al valor de la propiedad.

```
.inline-block {
    display: inline-block;
}
```

Los valores disponibles actualmente son:

- none
- block
- inline
- inline-block
- flex
- grid
- table

---

En esta sección también se encentran las clases genéricas que establecen `display: none` para mobile o para escritorio, `.no-desktop y .no-mobile`.

### Overflow

Las clases generadas acá están relacioandas con las propiedades `overflow`.

### Position

Aparte de las clases genéricas `position-relative` y `position-absolute` acá está un generador para las clases:

- top-0
- right-0
- bottom-0
- left-0

### Text

El generador de esta sección elabora las clases para las propiedades `text-align`. Los valores disponibles son:

- text-left
- text-center
- text-right

### Fonts

Desde aquí se generan las clases para las propiedades `font-weight`, llamadas con la siguiente estructura.

```
.font-xbold {
    font-weight: 900;
}
```

Las propiedades disponibles son:

- font-thin: 200
- font-normal: 400
- font-bold: 700
- font-xbold: 900

### Radius

En esta sección se generan las clases disponibles para generar esquinas curvas `border-radius`.

```
.rounded-sm {
    border-radius: 4px;
}
```

Las propiedades disponibles son:

- rounded-none: 0
- rounded-sm: 4px
- rounded-md: 16px
- rounded-lg: 50px
- rounded: 50%
