# @lofty87/cli

boilerplate cli for lofty87 project ([backend](https://github.com/lofty87/cli/tree/master/packages/baseBackend#backend), [frontend](https://github.com/lofty87/cli/tree/master/packages/baseFrontend#frontend), [playground](https://github.com/lofty87/cli/tree/master/packages/basePlayground#playground) based on [typescript](https://www.typescriptlang.org/)).

### - npx

```bash
npx @lofty87/cli <project-name>
```

### - npm

```bash
npm install -g @lofty87/cli

lofty87-cli <project-name>
```

### Options

```bash
lofty87-cli [-i] [--ignore-naming-rules] [-h] [-V] <project-name>
```

project name should follow [npm package naming rules](https://github.com/npm/validate-npm-package-name#naming-rules),

but you can also use `-i` or `--ignore-naming-rules` option to avoid following npm package naming rules.

<br />

### Development

#### 1. work and build

- work in watch mode.
- after build, run 'npm install -g' script ([webpack-hook-plugin](https://github.com/tienne/webpack-hook-plugin)).

```ts
npm run start:dev
```

#### 2. clean

- run 'npm uninstall -g' script.
- remove build dir.

```ts
npm run clean
```