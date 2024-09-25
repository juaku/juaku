import Gun from 'gun';

const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

export function saveCid({ cid, username }) {
  const feed = gun.get('feed');
  feed.set({ cid, username, timestamp: Date.now() });
}

export function getFeed(page, maxItems, callback) {
  const feed = gun.get('feed');

  // Borrar todo lo que hay en el feed
  // feed.map().once((data, key) => {
  //   feed.get(key).put(null);
  // });

  console.log('Page:', page);

  let count = -1;
  const startIndex = ((page - 1) * maxItems);
  const endIndex = startIndex + maxItems;

  feed.map().once((data) => {
    if(data) {
      count++;
      if (count >= startIndex && count < endIndex) {
        callback(data);
      } else {
        callback();
      }
    }
  });
}