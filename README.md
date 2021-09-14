<img src="https://pbs.twimg.com/profile_images/1379080793721561088/7wLcCuMm_400x400.jpg" alt="logo de arc" height="100"/> +
<img src="https://i.ibb.co/JRXhcWd/Grupo-El-Comercio-1996.png" alt="logo de grupo el comercio" height="100"/>

![pipeline](https://gitlab.ec.pe/contenidos/arc/badges/master/pipeline.svg)
![coverage](https://gitlab.ec.pe/contenidos/arc/badges/master/coverage.svg?job=coverage)

[![Quality Gate Status](https://sq.ec.pe/api/project_badges/measure?project=app-arc&metric=alert_status)](https://sq.ec.pe/dashboard?id=app-arc)

## Tabla de contenido

- [Versión de Fusion](#version-de-fusion)
- [Sistema Operativo recomendado](#sistema-operativo-recomendado)
- [Requerimientos](#requerimientos)
- [Instalación](#instalación)
- [Editor de código](#editor-de-código)
- [Convención de commits](#convención-de-commits)
- [Git hooks](#git-hooks)
- [Pruebas unitarias](#pruebas-unitarias)
- [Documentación](#documentación)

&nbsp;

## Versión de Fusion

| Versión | Estado    |
| ------- | --------- |
| 2.8.3   | Estable   |
| 3.0.1   | Inestable |

Para usar una versión específica en local, coloca en tu archivo `.env`:

```
FUSION_RELEASE=2.8.3
```

&nbsp;

## Sistema Operativo recomendado

**Ubuntu 20.04** _(es el sistema que recomendamos porque está comprobada su estabilidad con Arc Fusion)_ o algún otro **sistema basado en Linux**.
Si estas usando Windows, te recomendamos que trabajes sobre [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) para estar alineado con los estándares del proyecto.

&nbsp;

## Requerimientos

- `nodejs >= 12 & < 15` [instalar node](https://nodejs.org/en/). Es recomendable [instalar node usando nvm](https://github.com/nvm-sh/nvm) (node version manager)
- `git >= 2.13.0` [instalar git](https://git-scm.com/downloads).
- `npm = 6` viene junto a [nodejs](https://nodejs.org/en/). _(es importante que sea la versión 6 y no la versión 7, por ahora)_
- `docker >= 20` [instalar docker](https://docs.docker.com/get-docker/). _(si usas windows con WSL 2, sólo debes instalar docker en windows y ya tiene una opción por defecto para soportar WSL 2)_
- `docker-compose >= 1.29` [instalar docker-compose en Linux](https://docs.docker.com/compose/install/#install-compose). _(en windows y mac, docker-compose viene incluido con la instalación de docker)_

Para saber las versiones que tienes instaladas, copia, pega y ejecuta los siguientes comandos en tu terminal:

```bash
git --version
node --version
npm --version
docker --version
docker-compose --version
```

&nbsp;

## Instalación

Antes de iniciar con la instalación, por favor verifica que cumples los [requerimientos básicos](#requerimientos), y que has [generado y agregado una llave SSH](https://docs.gitlab.com/ee/ssh/#generate-an-ssh-key-pair) a tu cuenta de gitlab.

```bash
git clone git@gitlab.ec.pe:contenidos/arc.git
cd arc
npm run bootstrap
npx fusion start
```

&nbsp;

## Editor de código

[**VSC (Visual Studio Code)**](https://code.visualstudio.com/download)
Todo el equipo usa VSC por su versatilidad y extensiones que permiten mejorar increíblemente la experiencia de desarrollo en equipos.
Es importante que luego de instalar VSC, instales las **extensiones recomendadas** por el equipo.

![](https://i.ibb.co/x2kSP4w/exts.png)

&nbsp;

## Convención de commits

Los mensajes de `commit` deben estar estructurados de la siguiente manera:

```bash
<tipo>(alcance, opcional): <descripción>

# ejemplos
#
# Update(paywall): limpieza de código en vallas de noticias
# New: feature para crear feed de videos XML
# Fix(noticias): corrección en tamaño de texto de tags
```

**Tipos** de mensaje:

- `New:` normalmente representa una nueva característica, donde se han creado nuevos archivos.
- `Update:` incrementos, mejoras y nuevas características sobre archivos existentes (normalmente usarás mucho este tipo).
- `Fix:` ligeros cambios que solucionan un problema puntual en el código.

&nbsp;

## Git hooks

Para asegurar la salid y un flujo de trabajo seguro, usamos [husky v4](https://typicode.github.io/husky/) para ejecutar [git hooks](https://git-scm.com/docs/githooks) en tu repositorio local cada vez que haces un commit y push.
Aunque puedes usar cualquier Git GUI (ej. Sourcetree, GitKraken, etc.), recomendamos que uses el CLI de Git, usando tu terminal.

### ¿Cómo saltarme el git hook? _(esto sólo debe ser usado en casos de emergencia)_

Puedes evitar los hooks `pre-commit` y `commit-msg` usando la opción de Git `--no-verify`:

```bash
git commit -am "Fix: este commit no ejecutará ningún git hook" --no-verify
```

Para comandos de Git que no tiene la opción `--no-verify`, puedes usar la variable de entorno `HUSKY`:

```bash
HUSKY=0 git push # no se ejecutará ningún git hook
```

_Mira la [sección de requerimientos](#requerimientos) para asegurarte de estar usando la versión correcta de cada herramienta._
_Para más información, puedes revisar la [documentación de husky v4](https://github.com/typicode/husky/tree/master)._

&nbsp;

## Pruebas unitarias

> "The more your tests resemble the way your software is used, the more confidence they can give you." _[Kent C Dodds](https://twitter.com/kentcdodds/status/977018512689455106)_

Cada componente / funcionalidad debe tener sus pruebas unitarias para asegurarnos de entregar código robusto y libre de errores a producción, con cofianza.

En este proyecto usamos [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/docs/) y [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) para las pruebas unitarias, y celebramos que escribas pruebas que se acerquen lo más posible a como los componentes son usados por el usuario final.

### ¿Cómo ejecutar las pruebas unitarias?

```bash
# ejecuta las pruebas unitarias
npm run test

# ejecuta las pruebas unitarias en modo watch
npm run test:watch

# ejecuta las pruebas unitarias con coverage
npm run test:coverage

# ejecuta las pruebas unitarias en modo debug
npm run test:debug
```

&nbsp;

## Documentación

Si ya tienes acceso a Arc, podrás ingresar al [Arc Learning Center (ALC)](https://elcomercio.arcpublishing.com/alc/), donde encontrarás documentación sobre todos los productos de Arc.

&nbsp;
