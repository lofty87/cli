# @lofty87/cli

boilerplate cli for backend, frontend, playground

## cli feature

- webpack watching on dev
- after webpack build, run 'npm install -g' script ([webpack-hook-plugin](https://github.com/tienne/webpack-hook-plugin))

#### 1. dev and build

```ts
npm run start:dev
```

#### 2. clean

- run 'npm uninstall -g' script
- remove build dir

```ts
npm run clean
```