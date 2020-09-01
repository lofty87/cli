# baseFrontend

it is a development environment based on [create-react-app](https://create-react-app.dev/) for the lofty87 frontend project.

**HMR** is supported.

* [axios](https://github.com/axios/axios)
* [mobx4](https://mobx.js.org/README.html)(supported IE11)
* [styled-components](https://styled-components.com/)
* [storybook](https://storybook.js.org/)

## 1. Installation

```bash
npm install
```

## 2. Environment Variable

set in the *.env.development*, *.env.production(build)* files.

```txt
# required 'REACT_APP_' prefix
REACT_APP_NODE_ENV
REACT_APP_API_URL
REACT_APP_ASSETS_URL
```

## 3. Development

#### 1. webpack dev server
set by referring to environment variables in *.env.development* file.

```bash
npm start
```

#### 2. Storybook

you can manage components through a storybook.

```bash
npm run storybook
```

## 4. Production

set by referring to environment variables in *.env.production* file.

```bash
npm run build
```

## 5. Clean

remove *build* and *node_modules* dirs.

```bash
npm run clean
```