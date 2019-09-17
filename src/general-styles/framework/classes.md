# Clases construidas por el "framework":

## Flex:

Para construir las clases `flex` se han creado tres generadores agrupados por el nombre del atributo.

1. Construye las clases de atributos que inician con `flex-...`.

- `flex-1`
- `flex-none`
- `flex-grow`
- `flex-grow-0`
- `flex-shrink`
- `flex-shrink-0`
- `flex-col`
- `flex-col-reverse`
- `flex-row`
- `flex-row-reverse`
- `flex-wrap`
- `flex-no-wrap`

###### Ej.

```
.flex-1 {
    flex: 1;
}

.flex-none {
    flex: 0;
}

.flex-col-reverse {
    flex-direction: column-reverse;
}
```

2. Construye las clases referentes al atributo `justify-content`.

- `justify-start`
- `justify-center`
- `justify-end`
- `justify-between`
- `justify-evenly`

###### Ej.

```
.justify-start {
    justify-content: flex-start;
}

.justify-between {
    justify-content: space-between;
}
```

3. Construye las clases referentes al atributo `align-items`.

- `items-start`
- `items-center`
- `items-end`

###### Ej.

```
.items-start {
    align-items: flex-start;
}

.items-center {
    align-items: center;
}
```

La forma en la que se construyen las clases `flex` puede ser vista en detalle en `framework/core/_flex.scss`.

## Dimensiones:

Las clases base de dimensiones son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `w-full`
- `h-full`
- `w-auto`
- `h-auto`
- `w-inherit`
- `h-inherit`
- `w-0`
- `h-0`

Estas clases siguen la siguiente estructura, donde la primera letra de la clase define si afecta el `height` (h) o el `width` (w) del elemento, y lo que suceda al guión representa el atributo.

###### Ej.

```
.w-full {
    width: 100%;
}

.h-0 {
    height: 0;
}
```

### Margins y Paddings

Las clases que definen los `margin` y `padding`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-spaces.scss`.

Básicamente se generan `margin` y `padding` desde 0 a 40 en múltiplos de 5 (0,5,10,15,20,25,30,35,40), así ha sido definido por el diseño. Estos `margin` y `padding` estarán disponibles para todo el elemento y para cada lado (top,right,bottom,left), siguiendo la siguiente nomenclatura:

1. margin o padding global: `.[m o p]-[tamaño]`
2. margin o padding superior (top): `.[m o p]t-[tamaño]`
3. margin o padding derecho (right): `.[m o p]r-[tamaño]`
4. margin o padding inferior (bottom): `.[m o p]b-[tamaño]`
5. margin o padding izquierdo (left): `.[m o p]l-[tamaño]`

Adicionalmente se ha creado la clase `.mx-auto` que asigna `margin auto` a la derecha e izquierda para los casos en los que se usa `margin: 0 auto`, el uso sería una combinación `m-0 mx-auto`.

###### Ej.

```
.m-0 {
    margin: 0;
}

.pt-10 {
    padding-top: 10px;
}

.mb-40 {
    margin-bottom: 0;
}

.pl-0 {
    padding-left: 0;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}
```

## Object-fit y Object-position:

Las clases asociadas a los atributos `object-fit` y `object-position` son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `object-cover`
- `object-contain`
- `object-center`
- `object-top`
- `object-bottom`

###### Ej.

```
.object-cover {
    object-fit: cover;
}

.object-center {
    object-position: center;
}
```

## Displays:

Las clases para el atributo `display` son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `block`
- `flex`
- `grid`
- `inline`
- `inline-block`
- `table`
- `hidden`

###### Ej.

```
.hidden {
    display: none;
}

.flex {
    display: flex;
}
```

## Overflow:

Las clases para los atributos `overflow` son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `overflow-y`
- `overflow-y-auto`
- `overflow-x`
- `overflow-x-auto`
- `overflow-hidden`

## Posiciones:

Las clases para los atributos relacionados a `position` son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `position-relative`
- `position-absolute`
- `top-0`
- `right-0`
- `bottom-0`
- `left-0`

###### Ej.

```
.position-relative {
    position: relative;
}

.top-0 {
    top: 0;
}
```

## Textos:

Estas clases hacen referencia a la alineación de textos y las transformaciones más comunes. Son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `text-left`
- `text-center`
- `text-right`
- `uppercase`
- `capitalize`
- `underline`

###### Ej.

```
.text-left {
    text-align: left;
}

.uppercase {
    text-transform: uppercase;
}
```

### Peso de fuentes y familias de fuente base

Las siguientes clases relacionadas a textos definen la familia de fuente (normalmente dos variables que pueden variar por sitio) que se desea asignar y el peso de la fuente.

- `primary-font`
- `secondary-font`
- `tertiary-font`
- `font-thin` = 200
- `font-normal` = 400
- `font-bold` = 700
- `font-xbold` = 900

###### Ej.

```
.primary-font {
    font-family: $primary-font;
}

.font-normal {
    font-weight: 400;
}
```

### Tamaños de fuentes

Las clases para definir tamaños de fuentes `font-size`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-font-sizes.scss`. Además, las variables usadas para definir los tamaños de fuentes están ubicadas en `framework/variables/_declare-sizes.scss`.
Las clases disponibles son:

- `text-xs` = \$font-xs = 0.7rem
- `text-sm` = \$font-sm = 0.8rem
- `text-md` = \$font-md = 0.9rem
- `text-lg` = \$font-lg = 1rem
- `text-xl` = \$font-xl = 1.1rem

- `title-xs` = \$header-xs = 1.3rem
- `title-sm` = \$header-sm = 1.5rem
- `title-md` = \$header-md = 1.7rem
- `title-lg` = \$header-lg = 2rem
- `title-xl` = \$header-xl = 2.2rem

###### Ej.

```
.text-lg {
    font-size: 1rem;
}

.title-xs {
    font-size: 1.3rem;
}
```

> Los tamaños de fuente base por breakpoint están definidos en la etiqueta html.
> mobile = 1rem = 13px
> tablet = 1rem = 14px
> desktop = 1rem = 16px

### Colores de textos

Las clases que definen los colores de texto `color`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-text-colors.scss`.

Se generan únicamente seis colores de fuentes disponibles para todas las marcas, las variables asignadas a estas clases están relacionadas a los colores definidos en el archivo `framework/variables/_colors.scss`. La única clase de color de texto que debería representar un cambio por marca será `text-primary-color`, que tendrá asignada el `$color-primary` de la marca.

- `text-white` = \$color-white
- `text-black` = \$color-black
- `text-gray-300` = \$color-gray-300
- `text-gray-200` = \$color-gray-200
- `text-gray-100` = \$color-gray-100
- `text-primary-color` = \$color-primary

```
.text-white {
    color: #FFFFFF;
}

.text-gray-300 {
    color: #333333;
}
```

### Altura de líneas

Las clases para definir la altura de líneas `line-height`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-line-heights.scss`.
Las clases disponibles son:

- `line-h-none` = 1
- `line-h-xs` = 1.16
- `line-h-sm` = 1.33
- `line-h-md` = 1.5
- `line-h-lg` = 1.66
- `line-h-xl` = 1.83
- `line-h-double` = 2

###### Ej.

```
.line-h-xs {
    line-height: 1.166667;
}

.line-h-double {
    line-height: 2;
}
```

Actualmente 1/6 es el intervalo que se usa para incrementar la altura de línea por cada tramo desde 1 a 2.

## Bordes

### Grosor de bordes

Las clases que definen los `border-width`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-borders.scss`.

Básicamente se generan bordes de dos grosores, 0 y 1, para cinco escenarios:

1. borde global: `.border-[grosor]`
2. borde superior (top): `.border-t-[grosor]`
3. borde derecho (right): `.border-r-[grosor]`
4. borde inferior (bottom): `.border-b-[grosor]`
5. borde izquierdo (left): `.border-l-[grosor]`

Además, se han generado las clases `.border-solid` y `border-dashed`.

Las clases disponibles son:

- `border-0`
- `border-t-0`
- `border-r-0`
- `border-b-0`
- `border-l-0`
- `border-1`
- `border-t-1`
- `border-r-1`
- `border-b-1`
- `border-l-1`
- `border-solid`
- `border-dashed`

```
.border-1 {
    border-width: 1px;
}

.border-b-1 {
    border-bottom-width: 1px;
}

.border-solid {
    border-style: solid;
}
```

### Curvatura de bordes

Las clases para los atributos relacionados a `border-radius` son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `rounded-none` = 0 (ninguna curvatura)
- `rounded-sm` = 4px
- `rounded-md` = 16px
- `rounded-lg` = 50px
- `rounded` = 50% (curvatura completa)

###### Ej.

```
.rounded-none {
    border-radius: 0;
}

.rounded-md {
    border-radius: 16px;
}
```

### Colores de bordes

Las clases que definen los `border-color`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-borders.scss`.

Se generan únicamente cuatro colores de bordes disponibles para todas las marcas, las variables asignadas a estas clases pueden ser configuradas por marca en el archivo `scss/variables/_colors.scss` que corresponde a la marca, cambiando por ejemplo el `$border-color-base` o `$border-color-gray` por alguna otra intensidad.

- `border-white` = \$border-color-white
- `border-gray` = \$border-color-gray
- `border-black`= \$border-color-black
- `border-base` = \$border-color-base

> Por defecto estas variables en el core:
> $border-color-gray = $color-gray-100
> $border-color-base = $color-base-100

cursor-pointer

## Colores de fondo

Las clases que definen los `background-color`, son construidas por un generador que puede ser visto en detalle en `framework/generators/_generate-bg-colors.scss`.

Las clases disponibles obtienen valores de las variables de colores `framework/variables/_colors.scss` y son las siguientes:

- `bg-primary`
- `bg-secondary`
- `bg-tertiary`
- `bg-base-400`
- `bg-base-300`
- `bg-base-200`
- `bg-base-100`
- `bg-attention`
- `bg-link`
- `bg-error`
- `bg-info`
- `bg-success`
- `bg-white`
- `bg-black`
- `bg-gray-300`
- `bg-gray-200`
- `bg-gray-100`

###### Ej.

```
.bg-primary {
    background-color: $color-primary;
}
```

## Clases de íconos disponibles

- `icon-img`
- `icon-video`
- `icon-menu`
- `icon-marca`
- `icon-add`
- `icon-ribbon`
- `icon-facebook`
- `icon-twitter`
- `icon-linkedin`
- `icon-home`
- `icon-user`
- `icon-search`
- `icon-close`
- `icon-close-circle`
- `icon-add-circle`
- `icon-back`
- `icon-linkedin-circle`
- `icon-hamburguer`
- `icon-zoom`
- `icon-link`
- `icon-message`
- `icon-print`

## Breakpoints

Los estilos del proyecto están pensados mobile first, para lo cual se han definido dos breakpoints, uno que toma acción desde tablet en adelante y otro desde desktop.

Breakpoints:

1. Para tablet, desde 640px.
2. Para desktop, desde 1024px.

De todas las clases disponibles sólo algunas tienen la opción de cambiar según los breakpoints, estas son:

1. Todas las clases de `flex`.
2. Las clases de dimensiones `h-auto, w-0, w-full... etc`.
3. Las clases de `object-fit` y `object-position`.
4. Las clases de `display`.
5. Las clases de orientación para position-absolute `top-0, right-0, bottom-0, left-0`.
6. Las clases de posición `position-relative` y `position-absolute`.
7. Las clases de `text-align` y `font-weight`.
8. Las clases de `border-radius`.
9. Todas las clases de `margin` y `padding`.

Las clases responsive deben ser incluidas junto a las clases comunes, estas clases responsive sobreescribirán las clases de tamaño inferior en tiempo de ejecución.

### Tablet

Las clases para tablet son exactamente las mismas comunes pero deben incluir el prefijo `md:`.

###### Ej.

```
.md:m-0 {
    @media (--tablet) {
        margin: 0;
    }
}

.md:flex-col {
    @media (--tablet) {
        flex-direction: column;
    }
}
```

### Desktop

Las clases para desktop son exactamente las mismas comunes pero deben incluir el prefijo `lg:`.

###### Ej.

```
.lg:pt-20 {
    @media (--desktop) {
        padding-top: 20px;
    }
}

.lg:flex-row-reverse {
    @media (--desktop) {
        flex-direction: row-reverse;
    }
}
```

## Ejemplo de un objeto de clase completa:

```
const classes = {
  container: 'post-item bg-white flex secondary-font flex-col-reverse h-auto pt-5 pb-5 pr-15 pl-15 border-t-1 border-solid md:flex-col',
  date: 'post-item__date flex justify-start pt-5 pb-5 pr-10 pl-10 text-xs text-gray-200 md:pt-5 md:pb-5 md:pr-0 md:pl-0',
  content: 'post-item__content flex justify-between flex-row-reverse md:flex-row md:justify-start',
  figure: 'post-item__figure',
  image: 'post-item__image object-cover',
  description: 'post-item__description flex flex-col justify-between pr-10 pl-10',
  title: 'post-item__title uppercase m-0 font-thin title-sm text-gray-300 line-h-none',
  author: 'post-item__author m-0 font-thin text-xs text-gray-200 ',
}
```
