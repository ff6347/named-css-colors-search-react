import { Hono } from "hono";
import { cors } from "hono/cors";
import { colors } from "@ff6347/named-css-colors";
const keys = Object.keys(colors.hashmap);
function isValidColorName(color: string): boolean {
	return keys.includes(color);
}

const app = new Hono({strict: false}).basePath("/api");
app.use("/api/*", cors());

app.notFound((c) => {
	return c.text("Not Found path should be /[width]/[height]/[named CSS color] no trailing slashes", 404);
});

app.get("/:width?/:height?/:color?", (c) => {
	let isRandom = true;
	const randomColor = keys[Math.floor(Math.random() * keys.length)];
	let color = randomColor;
	let width = 100;
	let height = 100;

	const { color: colorParam, width: widthParam, height: heightParam } = c.req.param();
	if (colorParam) {
		if (!isValidColorName(colorParam)) {
			return new Response("Invalid color name. Path should be /[width]/[height]/[named CSS color]", { status: 400 });
		} else {
			color = colorParam;
			isRandom = false;
		}
	}
	if (widthParam) {
		if (isNaN(parseInt(widthParam))) {
			return new Response("Invalid width value. Path should be /[width]/[height]/[named CSS color]", { status: 400 });
		} else {
			width = parseInt(widthParam);
			height = width;
		}
	}

	if (heightParam) {
		if (isValidColorName(heightParam) && !colorParam) {
			color = heightParam;
			height = width;
			isRandom = false;
		} else if (isNaN(parseInt(heightParam))) {
			return new Response("Invalid height value. Path should be /[width]/[height]/[named CSS color]", { status: 400 });
		} else {
			height = parseInt(heightParam);
		}
	}

	const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>`;
	return c.body(svg, 200, {
		"Content-Type": "image/svg+xml",
		"Cache-Control": isRandom ? "public, max-age=1" : "public, max-age=31536000",
	});
});

export default app;