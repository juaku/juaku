import Gun from 'gun';

const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

export function saveCid({ cid, username }) {
  const feed = gun.get('feed');
  feed.set({ cid, username, timestamp: Date.now() });
}

export function getFeed(callback) {
  const feed = gun.get('feed');
  feed.map().once(callback);
}