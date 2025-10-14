import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl' // 👈 add this import

// https://vite.dev/config/
export default defineConfig({
    base: "/personal-room-folio/",
    plugins: [
        react(),
        glsl({
            include: [
                '**/*.glsl',
                '**/*.vs',
                '**/*.fs',
                '**/*.vert',
                '**/*.frag',
            ],
            exclude: 'node_modules/**',
            warnDuplicatedImports: false,
            defaultExtension: 'glsl',
            compress: false,
        }),
    ],
})