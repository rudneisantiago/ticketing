module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_STRIPE_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
};
