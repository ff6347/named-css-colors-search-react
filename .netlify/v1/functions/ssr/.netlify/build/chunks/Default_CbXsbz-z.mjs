import { c as createComponent, r as renderTemplate, a as addAttribute, f as renderHead, g as renderSlot, b as createAstro } from './astro/server__YMgZs5P.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$Default = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Default;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0,  maximum-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Named CSS Colors Search</title><meta name="description" content="Search for named CSS colors"><meta name="author" content="ff6347"><meta name="keywords" content="css, colors, search, named, list"><link rel="stylesheet" href="/index.css">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/layouts/Default.astro", void 0);

export { $$Default as $ };
