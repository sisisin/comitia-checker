const fs = require('fs');
const request = require('request-promise');
const TIA_LIST_BASE_URL = 'http://www.comitia.co.jp/history/';
const TIA_LIST_HTML_NAME = 'list_sp.html';
const buildTiaUrl = (num) => `${TIA_LIST_BASE_URL}${num}${TIA_LIST_HTML_NAME}`

async function main() {
  const num = 120;
  const res = await request.get(buildTiaUrl(num));
  fs.writeFileSync(`./dist/tia${num}.html`, res);
  console.log('done');
}

main().catch(e => console.log(e));
