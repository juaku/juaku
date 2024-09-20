import Gun from 'gun';

const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

export function saveCid({ cid, username }) {
  const feed = gun.get('feed');
  feed.set({ cid, username, timestamp: Date.now() });
}

export function getFeed(callback) {
  const feed = gun.get('feed');

  // Borrar todo lo que hay en el feed
  // feed.map().once((data, key) => {
  //   feed.get(key).put(null);
  // });

  feed.map().once(callback);
}