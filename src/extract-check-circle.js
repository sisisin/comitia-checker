const fs = require('fs');
const circleList = require('../dist/circle-list.json');
const checkListFromCatarom = require('../dist/check-list-from-catarom.json');

async function main() {
  const list = checkListFromCatarom.map(circle => {
    const { circleName, authorName, url, circleMsUrl, twitterUrl, pixivUrl } = circle;

    const circleFromList = circleList.find(c => c.name === circle.circleName);
    if (!circleFromList) {
      return { circleName, authorName, url, circleMsUrl, twitterUrl, pixivUrl };
    } else {
      const { space } = circleFromList;
      return { space, circleName, authorName, url, circleMsUrl, twitterUrl, pixivUrl };
    }
  });
  const matched = list.filter(c => c.space);
  const unMatched = list.filter(c => !c.space);
  fs.writeFileSync('dist/check-list.json', JSON.stringify({ matched, unMatched }));
}

main().catch(e => console.log(e));
