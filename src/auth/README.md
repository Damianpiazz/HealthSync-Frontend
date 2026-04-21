# Auth System (Auth.js + Google SSO)

Este módulo implementa la autenticación del frontend utilizando Auth.js (NextAuth v5) con Google SSO y sesiones basadas en JWT.

La carpeta `src/auth/` está diseñada como un módulo de infraestructura aislado, separado de las features de negocio.

---

## Estructura

```
src/auth/
  config.ts       # Configuración base de Auth.js
  providers.ts    # Providers de autenticación (Google)
  callbacks.ts    # Lógica de JWT y sesión
  types.ts        # Extensión de tipos (TypeScript)
  index.ts        # Punto de entrada (NextAuth)
```

---

## Conceptos clave de Auth.js

Auth.js maneja autenticación en Next.js mediante:

* Providers → fuentes de login (Google, GitHub, etc.)
* Callbacks → hooks para controlar JWT y sesión
* Session → estado del usuario en frontend
* JWT → almacenamiento interno de datos de sesión

---

## Flujo de autenticación

1. El usuario inicia login con Google
2. Auth.js redirige al provider (OAuth)
3. Google devuelve un access_token
4. Se ejecuta el callback jwt()
5. Se guarda información en el token (JWT)
6. Se construye la session accesible en el frontend

---

## Configuración

### `config.ts`

Define la configuración base:

```ts
export const authConfig = {
  basePath: "/auth",
  session: {
    strategy: "jwt",
  },
};
```

* basePath: prefijo de rutas (`/api/auth/*`)
* strategy: jwt → no usa base de datos, todo va en token

---

## Providers

### `providers.ts`

```ts
import Google from "next-auth/providers/google";

export const authProviders = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),
];
```

* Configura Google como provider
* Usa variables de entorno

---

## Callbacks

### `callbacks.ts`

Los callbacks permiten modificar el comportamiento de Auth.js.

#### jwt()

Se ejecuta:

* en login
* en cada request

Responsabilidad:

* guardar datos en el token

```ts
jwt({ token, account }) {
  if (account?.provider === "google") {
    token.accessToken = account.access_token;
  }
  return token;
}
```

---

#### session()

Se ejecuta cuando se construye la sesión para el frontend.

Responsabilidad:

* exponer datos del token al cliente

```ts
session({ session, token }) {
  session.accessToken = token.accessToken;
  return session;
}
```

---

## Tipos (TypeScript)

### `types.ts`

Extiende los tipos de Auth.js:

```ts
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
```

Esto permite acceder a:

```ts
session.accessToken
```

sin errores de TypeScript.

---

## Entry Point

### `index.ts`

```ts
export const { handlers, auth, signIn, signOut } = NextAuth({...})
```

Expone:

| Método    | Uso                      |
| --------- | ------------------------ |
| handlers  | API routes (GET, POST)   |
| auth()    | obtener sesión en server |
| signIn()  | iniciar login            |
| signOut() | cerrar sesión            |

---

## API Routes

Archivo:

```
src/app/api/auth/[...nextauth]/route.ts
```

```ts
export const { GET, POST } = handlers;
```

Esto habilita automáticamente:

* /api/auth/session
* /api/auth/signin/google
* /api/auth/signout
* /api/auth/callback/google

---

## Proxy (Next.js 16)

Archivo:

```
src/proxy.ts
```

Responsabilidades:

* interceptar requests globales
* validar sesión
* proteger rutas privadas

Ejemplo:

```ts
const session = await auth();

if (!session) {
  return redirect("/login");
}
```

---

## Relación JWT vs Session

| Capa    | Uso                             |
| ------- | ------------------------------- |
| JWT     | almacenamiento interno (server) |
| Session | datos accesibles en frontend    |

Flujo:

```
Google → JWT → Session → UI
```

---

## Consideraciones

* auth() solo funciona en server (server components, proxy)
* no almacenar datos sensibles innecesarios en session
* mantener callbacks livianos