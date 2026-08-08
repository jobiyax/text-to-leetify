import plugin from "bun-plugin-tailwind";

await Bun.build({
  entrypoints: ["./public/index.html"],
  compile: true,
  target: "browser",
  outdir: "./dist",
  plugins: [plugin],
  minify: true,
});
