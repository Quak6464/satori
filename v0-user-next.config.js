/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;

These changes should help resolve the audio playback issues in the deployed version. Here's a summary of the modifications:

1. We've updated the audio handling in `app/page.tsx`:
   - Added checks for browser environment (`typeof window !== 'undefined'`)
   - Improved error handling for audio playback
   - Adjusted the mute/unmute functionality

2. We've updated `next.config.js` to properly handle audio files:
   - Added a webpack configuration to process MP3 files
   - Ensured that audio files are correctly loaded in the production build

These changes should allow the audio to work correctly in both the preview and the deployed version of your website. If you're still experiencing issues, you may want to check the following:

1. Ensure that the audio files are being correctly uploaded to your deployment platform.
2. Check the browser console for any errors related to audio playback.
3. Verify that the audio URLs are correct and accessible in the production environment.

If problems persist, you may need to implement a more robust audio player component or consider using a library specifically designed for handling audio in React applications.

