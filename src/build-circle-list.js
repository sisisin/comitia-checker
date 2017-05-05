const cheerio = require('cheerio');
const fs = require('fs');

function obtainCircleList(listElm) {
  return listElm.find('tr')
    .filter((idx, elm) => elm.children.length === 2)
    .map((idx, elm) => {
      const [circleSpaceElm, circleDetailElm] = elm.children;
      const space = circleSpaceElm.children[0].data;
      const { url, name } = buildCircleDetail(circleDetailElm);
      return { space, url, name };
    });
}

function buildCircleDetail(elm) {
  const url = elm.children[0].attribs ? elm.children[0].attribs.href : '';
  const name = ((elm) => {
    switch (elm.children[0].type) {
      case 'tag': return elm.children[0].children[0].data;
      case 'text': return elm.children[0].data;
    }
  })(elm);
  return { url, name };
}

async function main() {
  const $ = cheerio.load(fs.readFileSync('./dist/tia120.html'));  // todo: build filename
  const lists = obtainCircleList($('table'));
  fs.writeFileSync('dist/circle-list.json', JSON.stringify(lists.get())); // todo: to constant variable
}
main().catch(e => console.log(e));
