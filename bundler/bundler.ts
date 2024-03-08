async function bundle() {
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    minify: false,
    sourcemap: "external",
    target: "browser",
  });
}

await bundle();

export { }
