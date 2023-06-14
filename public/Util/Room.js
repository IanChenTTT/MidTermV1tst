// https://hackernoon.com/build-a-chat-room-with-socketio-and-express
const { v4: uuidv4 } = require("uuid");

// the maximum number of people allowed in a room

class Room {
    #ROOM_MAX_CAPACITY = 0;
  constructor() {
    this.roomsState = [];
    this.#ROOM_MAX_CAPACITY = 100;
  }

  joinRoom(userID) {
    return new Promise((resolve) => {
      for (let i = 0; i < this.roomsState.length; i++) {
        if (this.roomsState[i].users < ROOM_MAX_CAPACITY) {
          this.roomsState[i].users++;
          return resolve(this.roomsState[i].id);
        }
      }

      const newID = uuidv4();
      this.roomsState.push({
        id: newID,
        users: 1,
        userID
      });
      return resolve(newID);
    });
  }

  leaveRoom(id) {
    this.roomsState = this.roomsState.filter((room) => {
      if (room.id === id) {
        if (room.users === 1) {
          return false;
        } else {
          room.users--;
        }
      }
      return true;
    });
  }
  set ROOM_MAX_CAPACITY(num){
    this.#ROOM_MAX_CAPACITY = num;
  }
}

module.exports = Room;