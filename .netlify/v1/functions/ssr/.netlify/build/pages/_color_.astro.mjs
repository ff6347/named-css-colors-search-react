import { c as createComponent, e as defineStyleVars, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from '../chunks/astro/server__YMgZs5P.mjs';
import { colors } from '@ff6347/named-css-colors';
/* empty css                                   */
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$color = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$color;
  const color = Astro2.params.color;
  if (!color) {
    return Astro2.rewrite("/404");
  }
  const selectedColor = colors.hashmap[color];
  if (!selectedColor) {
    return Astro2.rewrite("/404");
  }
  const colorname = color;
  console.log({ colorname });
  const $$definedVars = defineStyleVars([{ colorname }]);
  return renderTemplate`${maybeRenderHead()}<div class="color-box" data-astro-cid-qyackyvo${addAttribute($$definedVars, "style")}> <h1 data-astro-cid-qyackyvo${addAttribute($$definedVars, "style")}>${colorname}</h1> </div>`;
}, "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/pages/[color].astro", void 0);

const $$file = "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/pages/[color].astro";
const $$url = "/[color]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$color,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
