var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

scraper = {
  scrape: function (req, reply) {
    url = 'http://www.showmeboone.com/sheriff/JailResidents/JailResidents.asp';

    request(url, function(error, response, html){      
      if(!error){
        var $ = cheerio.load(html);
        var inmates = [];
        var rows = $('.resultsTable').children('tr').toArray();
        rows.shift();
        rows.forEach(function(row){
          var inmateData = $(row).children('td');
          var inmate = {
            last_name: $(inmateData).eq(0).text(),
            first_name: $(inmateData).eq(1).text(),
            middle_name: $(inmateData).eq(2).text(),
            gender: $(inmateData).eq(3).text(),
            race: $(inmateData).eq(4).text(),
            age: $(inmateData).eq(5).text(),
            city: $(inmateData).eq(6).text(),
            state: $(inmateData).eq(7).text()
          }
          inmates.push(inmate);
        });
      }
      else {
        response.send(error);
      }

      fs.writeFile('output.json', JSON.stringify(inmates, null, 2), function(err){
        console.log('File successfully written to output.json');
      });
      reply(inmates);
    });
  }
}

module.exports = scraper;
