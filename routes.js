var scraper = require('./scraper');

routes = {
  method: 'GET',
  path:'/', 
  handler: function (req, reply) {
    scraper.scrape(req, reply);
  }
}

module.exports = routes;
