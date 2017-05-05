const fs = require('fs');
const Iconv = require('iconv').Iconv;
const CHECK_LIST_PATH = process.env.CCSV_DIR;

function rawToObject(raw) {
  return raw.filter(line => line.indexOf('Circle') === 0).map(line => {
    const col = line.split(',');
    const space = ((col) => {
      const spacePrefix = col[7];
      const spaceNum = col[8];
      const spaceSuffix = col[21] === '0' ? 'a' : 'b';
      return `${spacePrefix}${spaceNum}${spaceSuffix}`;
    })(col);
    const circleName = col[10];
    const authorName = col[12];
    const url = col[14];
    const circleMsUrl = col[23];
    const twitterUrl = col[26];
    const pixivUrl = col[27];
    return { space, circleName, authorName, url, circleMsUrl, twitterUrl, pixivUrl };
  });
}

async function main() {
  const encoder = new Iconv('SHIFT_JIS', 'utf-8');
  const sjisBuf = fs.readFileSync(`${CHECK_LIST_PATH}/tia119.csv`);
  const csvRaw = encoder.convert(sjisBuf).toString().split('\r\n');
  fs.writeFileSync('dist/check-list-from-catarom.json', JSON.stringify(rawToObject(csvRaw)));
}
main().catch(e => console.log(e));
