import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@config": path.resolve(__dirname, "./src/config"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@pages": path.resolve(__dirname, "./src/pages"),
        },
    },
});
