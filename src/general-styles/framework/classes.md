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
    align-items: flex-start;
}

.flex-none {
    align-items: center;
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

Las clases para el atributo `display` son construidas por un generador que puede ser visto en detalle en `framework/core/_utils.scss`. Las clases base disponibles son:

- `overflow-y`
- `overflow-y-auto`
- `overflow-x`
- `overflow-x-auto`
- `overflow-hidden`

## Posiciones:

- `position-relative`
- `position-absolute`
- `top-0`
- `right-0`
- `bottom-0`
- `left-0`

  /\*_ ----------------------------_

-               TEXT            *
  _-------------------------------_/
  text-left
  text-center
  text-right
  uppercase
  capitalize
  /\*_ ----------------------------_
-             FONTS             *
  _-------------------------------_/
  primary-font
  secondary-font
  font-thin
  font-normal
  font-bold
  font-xbold
  /\*_ ----------------------------_
-            RADIUS             *
  _-------------------------------_/
  rounded-none
  rounded-sm
  rounded-md
  rounded-lg
  rounded
  /**\*\*\*** Extra **\*\*\*\***/
  cursor-pointer
  /\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***/
  /\*_ ----------------------------_
-           GENERATORS          *

  _-------------------------------_/

  /\*_ ----------------------------_

-       MARGINS & PADDINGS      *
  _-------------------------------_/
  m-0
  p-0
  mt-0
  pt-0
  mr-0
  pr-0
  mb-0
  pb-0
  ml-0
  pl-0
  m-5
  p-5
  mt-5
  pt-5
  mr-5
  pr-5
  mb-5
  pb-5
  ml-5
  pl-5
  m-10
  p-10
  mt-10
  pt-10
  mr-10
  pr-10
  mb-10
  pb-10
  ml-10
  pl-10
  m-15
  p-15
  mt-15
  pt-15
  mr-15
  pr-15
  mb-15
  pb-15
  ml-15
  pl-15
  m-20
  p-20
  mt-20
  pt-20
  mr-20
  pr-20
  mb-20
  pb-20
  ml-20
  pl-20
  m-25
  p-25
  mt-25
  pt-25
  mr-25
  pr-25
  mb-25
  pb-25
  ml-25
  pl-25
  m-30
  p-30
  mt-30
  pt-30
  mr-30
  pr-30
  mb-30
  pb-30
  ml-30
  pl-30
  m-35
  p-35
  mt-35
  pt-35
  mr-35
  pr-35
  mb-35
  pb-35
  ml-35
  pl-35
  m-40
  p-40
  mt-40
  pt-40
  mr-40
  pr-40
  mb-40
  pb-40
  ml-40
  pl-40
  mx-auto
  /\*_ ----------------------------_
-           FONT SIZES          *
  _-------------------------------_

//**\*\*\*** text-[size] **\*\*\***/
text-xs
text-sm
text-md
text-lg
text-xl

title-xs
title-sm
title-md
title-lg
title-xl
/\*_ ----------------------------_

-         LINE HEIGHTS          *
  _-------------------------------_/
  line-h-none
  line-h-xs
  line-h-sm
  line-h-md
  line-h-lg
  line-h-xl
  line-h-double
  /\*_ ----------------------------_
-             ÍCONOS            *
  _-------------------------------_/
  icon-img:before
  icon-video:before
  icon-menu:before
  icon-marca:before
  icon-add:before
  icon-ribbon:before
  icon-facebook:before
  icon-twitter:before
  icon-linkedin:before
  icon-home:before
  icon-user:before
  icon-search:before
  icon-close:before
  icon-close-circle:before
  icon-add-circle:before
  icon-back:before
  icon-linkedin-circle:before
  icon-hamburguer:before
  icon-zoom:before
  icon-link:before
  icon-message:before
  icon-print:before
  icon-publimetro:before
  /\*_ ----------------------------_
-            BORDERS            *
  _-------------------------------_/
  border-0
  border-t-0
  border-r-0
  border-b-0
  border-l-0
  border-1
  border-t-1
  border-r-1
  border-b-1
  border-l-1
  border-solid
  /\*_ ----------------------------_
-         BORDERS COLORS        *
  _-------------------------------_/
  border-white
  border-gray
  border-black
  border-base
  /\*_ ----------------------------_
-      BACKGROUND COLORS        *
  _-------------------------------_/
  bg-primary
  bg-secondary
  bg-tertiary
  bg-base-400
  bg-base-300
  bg-base-200
  bg-base-100
  bg-attention
  bg-link
  bg-error
  bg-info
  bg-success
  bg-white
  bg-black
  bg-gray-300
  bg-gray-200
  bg-gray-100
  /\*_ ----------------------------_
-       COLORES DE TEXTO        *
  _-------------------------------_/
  text-white
  text-black
  text-gray-300
  text-gray-200
  text-gray-100
  text-primary-color
  /\*_ ----------------------------_
-       TABLET        *

  _-------------------------------_/

  md\:flex-1
  md\:flex-none
  md\:flex-grow
  md\:flex-grow-0
  md\:flex-shrink
  md\:flex-shrink-0
  md\:flex-col
  md\:flex-col-reverse
  md\:flex-row
  md\:flex-row-reverse
  md\:flex-wrap
  md\:flex-no-wrap
  md\:justify-start
  md\:justify-center
  md\:justify-end
  md\:justify-between
  md\:justify-evenly
  md\:items-start
  md\:items-center
  md\:items-end
  md\:w-full
  md\:h-full
  md\:w-auto
  md\:h-auto
  md\:w-inherit
  md\:h-inherit
  md\:w-0
  md\:h-0
  md\:object-cover
  md\:object-contain
  md\:object-center
  md\:object-top
  md\:object-bottom
  md\:block
  md\:flex
  md\:grid
  md\:inline
  md\:inline-block
  md\:table
  md\:hidden
  md\:top-0
  md\:right-0
  md\:bottom-0
  md\:left-0
  md\:text-left
  md\:text-center
  md\:text-right
  md\:font-thin
  md\:font-normal
  md\:font-bold
  md\:font-xbold
  md\:rounded-none
  md\:rounded-sm
  md\:rounded-md
  md\:rounded-lg
  md\:rounded

  md\:m-0
  md\:p-0
  md\:mt-0
  md\:pt-0
  md\:mr-0
  md\:pr-0
  md\:mb-0
  md\:pb-0
  md\:ml-0
  md\:pl-0
  md\:m-5
  md\:p-5
  md\:mt-5
  md\:pt-5
  md\:mr-5
  md\:pr-5
  md\:mb-5
  md\:pb-5
  md\:ml-5
  md\:pl-5
  md\:m-10
  md\:p-10
  md\:mt-10
  md\:pt-10
  md\:mr-10
  md\:pr-10
  md\:mb-10
  md\:pb-10
  md\:ml-10
  md\:pl-10
  md\:m-15
  md\:p-15
  md\:mt-15
  md\:pt-15
  md\:mr-15
  md\:pr-15
  md\:mb-15
  md\:pb-15
  md\:ml-15
  md\:pl-15
  md\:m-20
  md\:p-20
  md\:mt-20
  md\:pt-20
  md\:mr-20
  md\:pr-20
  md\:mb-20
  md\:pb-20
  md\:ml-20
  md\:pl-20
  md\:m-25
  md\:p-25
  md\:mt-25
  md\:pt-25
  md\:mr-25
  md\:pr-25
  md\:mb-25
  md\:pb-25
  md\:ml-25
  md\:pl-25
  md\:m-30
  md\:p-30
  md\:mt-30
  md\:pt-30
  md\:mr-30
  md\:pr-30
  md\:mb-30
  md\:pb-30
  md\:ml-30
  md\:pl-30
  md\:m-35
  md\:p-35
  md\:mt-35
  md\:pt-35
  md\:mr-35
  md\:pr-35
  md\:mb-35
  md\:pb-35
  md\:ml-35
  md\:pl-35
  md\:m-40
  md\:p-40
  md\:mt-40
  md\:pt-40
  md\:mr-40
  md\:pr-40
  md\:mb-40
  md\:pb-40
  md\:ml-40
  md\:pl-40

/\*_ ----------------------------_

-       DESKTOP                 *
  _-------------------------------_/
  lg\:flex-1
  lg\:flex-none
  lg\:flex-grow
  lg\:flex-grow-0
  lg\:flex-shrink
  lg\:flex-shrink-0
  lg\:flex-col
  lg\:flex-col-reverse
  lg\:flex-row
  lg\:flex-row-reverse
  lg\:flex-wrap
  lg\:flex-no-wrap
  lg\:justify-start
  lg\:justify-center
  lg\:justify-end
  lg\:justify-between
  lg\:justify-evenly
  lg\:items-start
  lg\:items-center
  lg\:items-end
  lg\:w-full
  lg\:h-full
  lg\:w-auto
  lg\:h-auto
  lg\:w-inherit
  lg\:h-inherit
  lg\:w-0
  lg\:h-0
  lg\:object-cover
  lg\:object-contain
  lg\:object-center
  lg\:object-top
  lg\:object-bottom
  lg\:block
  lg\:flex
  lg\:grid
  lg\:inline
  lg\:inline-block
  lg\:table
  lg\:hidden
  lg\:top-0
  lg\:right-0
  lg\:bottom-0
  lg\:left-0
  lg\:text-left
  lg\:text-center
  lg\:text-right
  lg\:font-thin
  lg\:font-normal
  lg\:font-bold
  lg\:font-xbold
  lg\:rounded-none
  lg\:rounded-sm
  lg\:rounded-md
  lg\:rounded-lg
  lg\:rounded
  lg\:m-0
  lg\:p-0
  lg\:mt-0
  lg\:pt-0
  lg\:mr-0
  lg\:pr-0
  lg\:mb-0
  lg\:pb-0
  lg\:ml-0
  lg\:pl-0
  lg\:m-5
  lg\:p-5
  lg\:mt-5
  lg\:pt-5
  lg\:mr-5
  lg\:pr-5
  lg\:mb-5
  lg\:pb-5
  lg\:ml-5
  lg\:pl-5
  lg\:m-10
  lg\:p-10
  lg\:mt-10
  lg\:pt-10
  lg\:mr-10
  lg\:pr-10
  lg\:mb-10
  lg\:pb-10
  lg\:ml-10
  lg\:pl-10
  lg\:m-15
  lg\:p-15
  lg\:mt-15
  lg\:pt-15
  lg\:mr-15
  lg\:pr-15
  lg\:mb-15
  lg\:pb-15
  lg\:ml-15
  lg\:pl-15
  lg\:m-20
  lg\:p-20
  lg\:mt-20
  lg\:pt-20
  lg\:mr-20
  lg\:pr-20
  lg\:mb-20
  lg\:pb-20
  lg\:ml-20
  lg\:pl-20
  lg\:m-25
  lg\:p-25
  lg\:mt-25
  lg\:pt-25
  lg\:mr-25
  lg\:pr-25
  lg\:mb-25
  lg\:pb-25
  lg\:ml-25
  lg\:pl-25
  lg\:m-30
  lg\:p-30
  lg\:mt-30
  lg\:pt-30
  lg\:mr-30
  lg\:pr-30
  lg\:mb-30
  lg\:pb-30
  lg\:ml-30
  lg\:pl-30
  lg\:m-35
  lg\:p-35
  lg\:mt-35
  lg\:pt-35
  lg\:mr-35
  lg\:pr-35
  lg\:mb-35
  lg\:pb-35
  lg\:ml-35
  lg\:pl-35
  lg\:m-40
  lg\:p-40
  lg\:mt-40
  lg\:pt-40
  lg\:mr-40
  lg\:pr-40
  lg\:mb-40
  lg\:pb-40
  lg\:ml-40
  lg\:pl-40
