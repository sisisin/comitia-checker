const fs = require('fs');
const checkList = require('../dist/check-list.json');

function katakanaToHiragana(src) {
  return src.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

async function main() {
  const header = ['space,name,author,url'];
  const body = checkList.matched.sort((a, b) => {
    const preparedA = katakanaToHiragana(a.space.toLowerCase());
    const preparedB = katakanaToHiragana(b.space.toLowerCase());
    switch (true) {
      case preparedA > preparedB: return 1;
      case preparedA === preparedB: return 0;
      case preparedA < preparedB: return -1;
    }
  }).map(circle => {
    const { space, circleName, authorName, url, circleMsUrl, twitterUrl, pixivUrl } = circle;
    return [space, circleName, authorName, url].join(',');
  });
  const csv = header.concat(body).join('\n');
  fs.writeFileSync('dist/check-list.csv', csv);
}

main().catch(e => console.log(e));

