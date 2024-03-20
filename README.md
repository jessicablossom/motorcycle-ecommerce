# simpliMuv code challenge

Aplicación armada con react, next.js utilizando next router y next api para consumir los endpoints, estilada con tailwind, utilizando prettier como linter para formatear el código.

## Getting Started

First install dependencies

```bash
npm run dev
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Desarrollo y problematicas

Utilizando una estructura de fichero, se organizó el proyecto de la siguiente forma:

```bash
src
├── components
│   └── common
├── contextApi
├── hooks
├── pages
│   └── api
└── styles
└── utils
```

Se utilizo next api para poder acceder localmente a los endpoints que quedaban bloqueados por CORS.
Se empleo context para guardar la información de la orden o reserva en la medida en la que avanzaba el proceso.
Se creó una carpeta de utils donde ubicar funciones que podemos reutilizar en todo el proyecto.

Si bien la app esta estilada con Tailwind (por utilizacion de la sugerencia de la consigna), considero que el codigo queda sobrecargado y en mi preferencia personal utilizaria material UI con styled-components, que permiten quitar la acumulacion de estilos en el render y poder manejarlos fuera del componente.

### Pendientes

Creación de tests para los componentes UI y las apis con Jest
