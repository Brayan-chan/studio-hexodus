# CMS de Hexodus

Sanity Studio para administrar el contenido de la landing Vite de Hexodus. Usa el dataset `production` del proyecto `yr2v9nsi`.

## Requisitos

- Node.js 22.12 o superior (recomendado: `nvm use 22`)
- pnpm
- acceso al proyecto de Sanity

## Desarrollo local

```bash
pnpm install
pnpm dev
```

El Studio separa las páginas/configuraciones únicas de las colecciones de membresías, promociones, coaches e instalaciones. Las opciones de verificación distinguen datos confirmados con el cliente de datos provisionales.

## Migración inicial

El generador crea un NDJSON reproducible desde la landing y referencia sus imágenes locales para que Sanity las suba como assets.

```bash
HEXODUS_WEB_ROOT=/Users/brayanchan/Documents/HEXODUS2 pnpm content:generate
pnpm content:validate
```

Antes de importar, revisar el resumen y confirmar teléfono, dirección, horarios, precios y promoción con el cliente.

```bash
pnpm schema:deploy
pnpm content:import
```

`content:import` es una migración controlada; no debe ejecutarse automáticamente en cada despliegue.

## Publicar el Studio

```bash
pnpm deploy
```

La primera publicación solicita un hostname `*.sanity.studio`. Después se invita a los editores desde la administración del proyecto.

## Conexión con la landing Vite

La landing consulta contenido publicado durante el build:

```bash
SANITY_PROJECT_ID=yr2v9nsi
SANITY_DATASET=production
SANITY_CONTENT_MODE=auto
```

- `auto`: usa Sanity y, si falla, recurre al contenido local.
- `required`: falla si Sanity no responde o faltan documentos. Recomendado en producción una vez aprobado el flujo editorial.
- `local`: ignora Sanity; útil para pruebas sin conexión.

Para reflejar publicaciones automáticamente, configurar un webhook de Sanity al deploy hook del hosting.

## Comprobaciones

```bash
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm content:validate
pnpm build
```
