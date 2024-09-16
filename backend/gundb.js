// backend/gundb.js
import Gun from 'gun';

const gun = Gun({
  peers: ['https://gun-manhattan.herokuapp.com/gun']
});

export default gun;