module.exports = {
    async redirects() {
      return [
        {
          source: '/:anno(\\d{4})/:mese(\\d{2})/:slug',
          destination: '/articolo/:slug',
          permanent: false,
        },
      ]
    },
  }