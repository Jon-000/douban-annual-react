
const fs = require("fs");
const path = require("path");


// 遍历通过getPageJSon.js下载的68个json文件,更改每个json文件url
// 0.json手动改过了所以不处理
for (let i=68; i>0; i--) {
  // 读取
  const rs = fs.createReadStream(`${i}.json`, {encoding: "utf-8"})
  rs.on("error", (err) => console.error("read json file failed, ", err))
  let buf = ''
  rs.on("data", (chunk) => {
    buf += chunk.toString(); // when data is read, stash it in a string buffer
  })
  rs.on("end", () => {
    let obj = JSON.parse(buf);

    switch (obj.res.kind) {
      case 0:
        // start_page
        break;
      case 1:
        // 更新
        obj.res.payload.background_img = `/fakeApi/assets/images/${getFileName(obj.res.payload.background_img)}`
        obj.res.payload.mobile_background_img = `/fakeApi/assets/images/${getFileName(obj.res.payload.mobile_background_img)}`
        obj.res.subject.cover = `/fakeApi/assets/images/${getFileName(obj.res.subject.cover)}`
        obj.res.subjects.forEach(subj => {
          subj.cover = `/fakeApi/assets/images/${getFileName(subj.cover)}`
        });
        break;
      case 2:
        obj.res.payload.background_img = `/fakeApi/assets/images/${getFileName(obj.res.payload.background_img)}`
        obj.res.payload.mobile_background_img = `/fakeApi/assets/images/${getFileName(obj.res.payload.mobile_background_img)}`
        obj.res.subject.cover = `/fakeApi/assets/images/${getFileName(obj.res.subject.cover)}`
        break;
    
      default:
        break;
    }

    // 保存
    const file = fs.createWriteStream(`${i}.json`)
    file.on("error",(err) => console.error("writestream error,", err))
    file.on('finish', function() {
      file.close(cb);
    });
    // file.write(JSON.stringify(obj)) //这样写入的文件会是单行无空格
    file.write(JSON.stringify(obj, null, 2))
  })
}

// 返回url路径最后一个`/`后的内容作为文件名
const getFileName= (url) => {
  const re = /[^\/]+$/g
  return url.match(re)[0]
}
