import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  var config = {
    plugins: [react()],
    root: "src",
    base: "./",  // 相対パスでpublicなど参照できるように
    publicDir: "public",
    build: {
      outDir: '../dist',
      // emptyOutDir: true,  // 絶対空にしないこと！
      sourcemap: true,
      rollupOptions: {
        input: {
          'temporary-registration': 'src/temporary-registration.tsx',
          'official-registration': 'src/official-registration.tsx',
          'password-registration': 'src/password-registration.tsx',
          'otp-transmission': 'src/otp-transmission.tsx',
          'login': 'src/login.tsx',
          'account-reregistration': 'src/account-reregistration.tsx',
          'mail-address-reregistration': 'src/mail-address-reregistration.tsx',
          'inquiry': 'src/inquiry.tsx',
          'users': 'src/users.tsx',
          'contracts-media': 'src/contracts-media.tsx',
          'contracts-media-detail': 'src/contracts-media-detail.tsx',
          'contracts-media-invoices': 'src/contracts-media-invoices.tsx',
          'contracts-other': 'src/contracts-other.tsx',
          'contracts-other-invoices': 'src/contracts-other-invoices.tsx',
          'admin-infos': 'src/admin-infos.tsx',
          'admin-users': 'src/admin-users.tsx',
        },
        output: { // entry chunk assets それぞれの書き出し名の指定、ハッシュ値を使われると毎回変わって困るので
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
          manualChunks: (id: string) => {
              if (id.includes('node_modules')) {
                  if (id.includes('node_modules/ol/') || id.includes('node_modules/proj4/')) {
                      return 'vendor_ol';
                  } else if (
                      id.includes('node_modules/bootstrap/') ||
                      id.includes('node_modules/@popperjs/')
                  ) {
                      return 'vendor_bs';
                  }
                  return 'vendor'; // all other package goes here
              }
          },
        },
      },
    },
  }
  if (mode === "development") {
    return config;
  }
  else {
    config.build.sourcemap = false;  // ソースマップの出力抑止
    return config;
  }
})
