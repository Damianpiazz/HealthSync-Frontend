# SKILLS.md

## Mental Model

Arquitectura por features verticales.

Cada feature encapsula estado, lógica y UI, expone una API mínima y no filtra implementación interna.

Objetivo: minimizar dependencia implícita, maximizar predictibilidad.

---

## Estructura de Directorios
```
src/
├── app/          → entry point, routing
├── features/     → dominio funcional (ver contrato abajo)
├── shared/       → componentes y utilidades usados en 2+ features
└── entities/     → contratos de tipos globales (solo si es estrictamente necesario)
```
---

## Contrato de Feature

Cada feature DEBE:

1. Tener una única responsabilidad clara
2. Exponer su API pública solo vía `index.ts`
3. No filtrar detalles internos (store, schemas, etc.)
4. No importar directamente de otra feature — si algo es necesario en 2+ features, se mueve a `shared/`

---

## Estructura por Feature
```
src/features/{feature-name}/
├── test/
├── actions/
├── components/
├── hooks/
├── services/
├── store/
├── types/
├── validations/
└── index.ts
````

---

## Reglas por Capa

### `actions/`
Orquestan el flujo: reciben input, llaman services, actualizan store. No implementan lógica de negocio compleja.

Anti-patterns: lógica duplicada, mezclar fetch con mutación de store en el mismo bloque.

---

### `services/`
Única fuente de verdad para IO (API, DB, servicios externos). Funciones puras o casi puras: sin estado, sin UI.

Regla: nunca importar React aquí.

---

### `store/`
Estado local o global (Zustand, Jotai, Redux, etc.). Solo estado + setters.

Anti-pattern: meter lógica que pertenece a `services/`.

---

### `components/`
UI pura, sin lógica de negocio. Separar presentational de container cuando la complejidad lo justifique.

---

### `hooks/`
Encapsulan lógica stateful reutilizable entre componentes de la misma feature (estado local, efectos, combinación de store + service).

Regla: si un hook es necesario en 2+ features, se mueve a `shared/`.

---

### `validations/`
Schemas de validación (Zod u equivalente). Fuente única: reutilizable entre frontend y backend si aplica.

---

### `types/`
Tipos internos de la feature. No duplicar tipos definidos en `entities/`.

---

### `test/`
Unit tests únicamente. Un archivo de test por módulo, mismo nombre con sufijo `.test.ts`.

---

### `index.ts`
API pública de la feature. Solo se exporta lo que otras partes del sistema necesitan consumir.



```ts
export * from "./components/FeatureComponent";
export * from "./hooks/useFeature";
export * from "./actions/feature.action";
```

## Naming

```
feature:     user-profile
action:      user-profile.action.ts
service:     user-profile.service.ts
store:       user-profile.store.ts
hook:        useUserProfile.ts
test:        user-profile.service.test.ts
```

Consistencia > preferencia personal.

---

## Regla de Promoción

| Condición | Acción |
|---|---|
| Lógica usada en 1 feature | Vive dentro de la feature |
| Lógica usada en 2+ features | Se mueve a `shared/` |
| Tipo usado en 2+ features | Se mueve a `entities/` |