import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server__YMgZs5P.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Default } from '../chunks/Default_CbXsbz-z.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Default", $$Default, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>¯\\_(ツ)_/¯</h1> <img src="/not-found.gif" alt="a snippet from the movie star wars a new hope where Obi-Wan Kenobi says 'this is not the color you are looking for'"> <a href="/">Go back home</a> ` })}`;
}, "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/pages/404.astro", void 0);

const $$file = "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
