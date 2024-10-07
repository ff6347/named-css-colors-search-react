# Named CSS Colors Search React

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

React app built with Astro to search named CSS colors. Used in my seminar fundamentals of digital communicaiton at university of arts Braunschweig.

## Features

- [x] Search for named CSS colors
- [x] Copy color to clipboard
- [x] API: Get a random named CSS color
- [x] API: Get a random named CSS color of a given size
- [x] API: Get a named CSS color of a given size and color
- [ ] Save favorite colors to local storage
- [ ] Get color overview for named CSS colors

## API

API is build with hono. Following endpoints are available:

- GET `/api/`
- GET `/api/[size]`
- GET `/api/size/[color]`
- GET `/api/[width]/[height]/[color]`

Returns a SVG image with the given width, height (if not given, width is used) and color (if not given, a random color is used).


## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

```bash
upload dist folder somewhere
```

## Related

Related to https://github.com/ff6347/css-color-names-raycast

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=128" width="128px;" alt="Fabian Morón Zirfas"/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/ff6347/named-css-colors-search-react/commits?author=ff6347" title="Code">💻</a> <a href="#infra-ff6347" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-ff6347" title="Design">🎨</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
