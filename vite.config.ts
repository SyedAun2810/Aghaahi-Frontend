import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [
      react(),
      svgr({
        include: "**/*.svg",
      }),
    ],
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 2000,
      sourcemap: true,          // ✅ Enable source maps
      minify: false,            // ✅ Disable minification for debugging
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "./runtimeConfig": "./runtimeConfig.browser",
        "@Services": path.resolve(__dirname, "src/services"),
        "@Utils": path.resolve(__dirname, "src/utils"),
        "@Theme": path.resolve(__dirname, "src/theme"),
        "@Routes": path.resolve(__dirname, "src/routes"),
        "@ReusableFunctions": path.resolve(__dirname, "src/reusableFunctions"),
        "@Validations": path.resolve(__dirname, "src/validations"),
        "@Store": path.resolve(__dirname, "src/stores"),
        "@Api": path.resolve(__dirname, "src/apiService"),
        "@Constants": path.resolve(__dirname, "src/constants"),
        "@Pages": path.resolve(__dirname, "src/pages"),
        "@Components": path.resolve(__dirname, "src/components"),
        "@Assets": path.resolve(__dirname, "src/assets"),
        "@Navigation": path.resolve(__dirname, "src/navigation"),
        "@Layout": path.resolve(__dirname, "src/layout"),
        "@Styles": path.resolve(__dirname, "src/styles"),
        "@Hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  };
});
