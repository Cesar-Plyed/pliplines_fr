# 03 · `getData` devuelve datos tipados (sin callbacks `setState`)

Repo: FR · Depends on: — · Status: draft

## Context
`api.tsx:8-9` y `menuCards.tsx:19,22` usan `any[]` en los callbacks de `getData`. El patrón actual:

```ts
await getData(
  (drinks: SetStateAction<any[]>) => { result.drinks = drinks as never[]; },
  (foods: SetStateAction<any[]>) => { result.foods = foods as never[]; },
  (error) => { throw error; }
);
```

Exige 4 anotaciones `any[]` + casts `as never[]`. El lint reporta 4 errores `@typescript-eslint/no-explicit-any`.

## Expected behavior
`getData()` retorna directamente un objeto tipado `{ drinks: MenuItem[]; foods: MenuItem[] }`. No existen callbacks ni `any[]` en el código. `menuCards.tsx` lee el return value. Lint → 0 errores.

## Acceptance criteria
- `api.tsx` exporta un tipo `MenuData` y `getData` retorna `Promise<MenuData>`.
- `menuCards.tsx` llama `await getData()` (sin parámetros) y asigna `menuData.drinks` / `.foods`.
- `npm run lint` → 0 errors (los 4 `any` desaparecen).
- `npm run build` → exit 0.

## Out of scope
- Validación de imágenes (spec #02).
- URL del API por env (spec #04).
- Formulario de nuevo item (spec #05).

## Verification
```bash
npm run lint
npm run build
```
