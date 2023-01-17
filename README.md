# Turborepo Svelte & Fastify w/trpc & prisma starter

This is an custom made Turborepo starter.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `mobile`: a [svelte-kit] app
- `api`: a [fastify] app with [trpc] and [prisma]
- `eslint-config-custom`: `eslint` configurations (includes `eslint-plugin-svelte` and `eslint-config-prettier`)

Each package/app is 100% [TypeScript].

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript] for static type checking
- [ESLint] for code linting
- [Prettier] for code formatting

## Using this example

Run the following command:

```sh
npx degit HanielU/turbo-sk-fastify-trpc-prisma turbo-fastify
cd turbo-fastify
yarn
git init . && git add . && git commit -m "Init"
```
<!-- initialise all the links used -->
[trpc]: https://trpc.io
[fastify]: https://www.fastify.io
[prisma]: https://www.prisma.io
[svelte-kit]: https://kit.svelte.dev
[typescript]: https://www.typescriptlang.org
[eslint]: https://eslint.org
[prettier]: https://prettier.io