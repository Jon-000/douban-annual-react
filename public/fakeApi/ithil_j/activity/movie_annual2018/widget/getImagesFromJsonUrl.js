
const fs = require("fs");
const path = require("path");
const http = require('http');
const https = require('https')

const download = function(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, function(response) {
    response.pipe(file);
    file.on("error",(err) => console.error("writestream error,", err))
    file.on('finish', function() {
      file.close(cb);
    });
  });
}


// 遍历通过getPageJSon.js下载的68个json文件,下载每个json文件url指向的图片
// 0.json手动改过了所以不处理
for (let i=68; i>=0; i--) {
  const rs = fs.createReadStream(`${i}.json`, {encoding: "utf-8"})
  rs.on("error", (err) => console.error("read json file failed, ", err))
  let buf = ''
  rs.on("data", (chunk) => {
    buf += chunk.toString(); // when data is read, stash it in a string buffer
  })
  rs.on("end", () => {
    console.log(buf.length)
    let obj = JSON.parse(buf);

    switch (obj.res.kind) {
      case 0:
        // start_page
        break;
      case 1:
        downloadImage(obj.res.payload.background_img);
        downloadImage(obj.res.payload.mobile_background_img);
        downloadImage(obj.res.subject.cover);
        obj.res.subjects.forEach(subj => {
          downloadImage(subj.cover)
        });
        break;
      case 2:
        downloadImage(obj.res.payload.background_img);
        downloadImage(obj.res.payload.mobile_background_img);
        downloadImage(obj.res.subject.cover);
        break;
      default:
        break;
    }
  })
}

// 根据json中的路径下载图片,保存文件名为url路径最后一个`/`后的内容
const downloadImage = (url) => {
  const re = /[^\/]+$/g
  const filename = url.match(re)[0]
  download(url, filename, () => console.log(`download ${filename}`) )
}


process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log(err)
})