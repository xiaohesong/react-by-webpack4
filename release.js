const fs = require('fs')

function YMD() {
  let dater = new Date();
  const year = dater.getFullYear();
  const month = dater.getMonth() + 1;
  const date = dater.getDate();
  const hour = dater.getHours() < 10 ? "0" + dater.getHours() : dater.getHours();
  const minute = dater.getMinutes() < 10 ? "0" + dater.getMinutes() : dater.getMinutes();
  const second = dater.getSeconds() < 10 ? "0" + dater.getSeconds() : dater.getSeconds();
  return `${year}${month}${date}${hour}${minute}${second}`
}

const ymd = YMD()
const release = ymd + '-' + Date.now().toString().slice(-6)
const fileName = '.env.production.local'

fs.exists("dirName", function (exists) {
  if(exists) fs.unlinkSync(fileName);
})

fs.readFileSync(fileName, {flag: 'a+', encoding: 'utf8'})
fs.writeFileSync(fileName, `XHS_RELEASE_VERSION=${release}`);