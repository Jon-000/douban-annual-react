const http = require('http');
const https = require('https')
const fs = require('fs');
const path = require('path');

const download = function(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

for (let i = 1 ; i <= 68; i++) {
  download(
    `https://movie.douban.com/ithil_j/activity/movie_annual2018/widget/${i}`,
    path.join(__dirname, `${i}.json`),
    () => console.log(`get ${i}.json done!!!`)
  )
}
