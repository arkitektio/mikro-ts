import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],

  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    lib: {
      entry: "src/mikro/index.tsx",
      name: "mikro",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@apollo/client",
        "apollo-upload-client",
        "subscriptions-transport-ws ",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
