# @lofty87/cli

boilerplate cli for lofty87 project (backend, frontend, playground)

### - npx

```bash
npx @lofty87/cli [project name]
```

### - npm

```bash
npm install -g @lofty87/cli

lofty87-cli [project name]
```

### Development

#### 1. work and build

- work in watch mode.
- after build, run 'npm install -g' script ([webpack-hook-plugin](https://github.com/tienne/webpack-hook-plugin))

```ts
npm run start:dev
```

#### 2. clean

- run 'npm uninstall -g' script
- remove build dir

```ts
npm run clean
```