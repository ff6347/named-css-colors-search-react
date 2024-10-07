import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server__YMgZs5P.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Default } from '../chunks/Default_CbXsbz-z.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { colors } from '@ff6347/named-css-colors';
export { renderers } from '../renderers.mjs';

function LucideCopy(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...props,
      children: /* @__PURE__ */ jsxs(
        "g",
        {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          children: [
            /* @__PURE__ */ jsx("rect", { width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2 }),
            /* @__PURE__ */ jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
          ]
        }
      )
    }
  );
}

const ColorList = () => {
  const [copiedColor, setCopiedColor] = useState(null);
  const [filter, setFilter] = useState("");
  const filteredColors = useMemo(() => {
    return colors.items.filter(
      (color) => color.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);
  const copyToClipboard = (colorArg) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(colorArg).then(() => {
        setCopiedColor(colorArg);
        setTimeout(() => setCopiedColor(null), 2e3);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = colorArg;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedColor(colorArg);
        setTimeout(() => setCopiedColor(null), 2e3);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
      document.body.removeChild(textArea);
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxs("div", { id: "color-list", style: { display: "grid", gap: "20px" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Filter colors...",
          value: filter,
          onChange: (e) => setFilter(e.target.value),
          style: {
            padding: "10px",
            boxSizing: "border-box"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          id: "color-items-container",
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "10px"
          },
          children: filteredColors.map((color) => {
            const [h, s, l] = color.hsl;
            const isDark = l < 50;
            const iconColor = isDark ? `hsl(0, 0%, 70%)` : `hsl(0, 0%, 30%)`;
            const buttonBgColor = isDark ? `hsla(${h}, ${s}%, ${l + 10}%, 0.3)` : `hsla(${h}, ${s}%, ${l - 10}%, 0.3)`;
            return /* @__PURE__ */ jsxs(
              "figure",
              {
                style: {
                  margin: 0,
                  textAlign: "center",
                  width: "100%",
                  position: "relative",
                  border: "1px solid hsl(0, 0%, 80%)",
                  borderRadius: "10px",
                  overflow: "hidden"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      id: "color-item",
                      style: {
                        width: "100%",
                        paddingBottom: "100%",
                        backgroundColor: color.name,
                        position: "relative"
                      },
                      children: /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => copyToClipboard(color.name),
                          style: {
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: buttonBgColor,
                            border: "none",
                            borderRadius: "5px",
                            width: "30px",
                            height: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                          },
                          children: /* @__PURE__ */ jsx(
                            LucideCopy,
                            {
                              style: {
                                width: "18px",
                                height: "18px",
                                color: iconColor
                              }
                            }
                          )
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "figcaption",
                    {
                      style: {
                        padding: "5px",
                        backgroundColor: "hsla(0, 0%, 100%, 0.8)",
                        color: "hsl(0, 0%, 20%)"
                      },
                      children: color.name
                    }
                  )
                ]
              },
              color.title
            );
          })
        }
      )
    ] }),
    copiedColor && /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "hsla(0, 0%, 0%, 0.7)",
          color: "hsl(0, 0%, 100%)",
          padding: "10px 20px",
          borderRadius: "5px",
          zIndex: 1e3
        },
        children: [
          "Copied: ",
          copiedColor
        ]
      }
    )
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Default, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="App"> <h1>Named CSS Colors Search</h1> ${renderComponent($$result2, "ColorList", ColorList, {})} </div> ` })}`;
}, "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/pages/index.astro", void 0);

const $$file = "/Users/tomato/Documents/ff6347/named-css-colors-search-react/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
