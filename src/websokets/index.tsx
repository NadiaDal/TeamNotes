import {Action, ChangeMessage, InitMessage, Message} from '../types/websockets';
import * as Automerge from 'automerge';
import store from '../store';
import {onChanges, onInit} from '../store/notesSlice';
import AutomergeStore from '../automerge';
import {API_URL} from '@env';

const SOCKET_REOPEN_TIMEOUT = 5000;

class SocketConnection {
  private ws: WebSocket | null = null;
  private isConnectionOpen = false;

  isOpen() {
    return this.isConnectionOpen;
  }

  open(localHistory: Automerge.Change[]) {
    this.ws = new WebSocket(API_URL);

    this.ws.onopen = () => {
      this.isConnectionOpen = true;
      const init: InitMessage = {
        action: Action.INIT,
        team: 'awesome_team',
        payload: JSON.stringify(localHistory),
      };
      this.ws?.send(JSON.stringify(init));
    };

    this.ws.onmessage = e => {
      const message = JSON.parse(e.data) as Message;
      switch (message.action) {
        case Action.INIT: {
          store.dispatch(onInit(message.payload));
          break;
        }
        case Action.CHANGES: {
          store.dispatch(onChanges(message.payload));
          break;
        }
      }
    };

    this.ws.onclose = () => {
      this.isConnectionOpen = false;
      setTimeout(
        () => this.open(AutomergeStore.getAllChanges()),
        SOCKET_REOPEN_TIMEOUT,
      );
    };
  }

  sendChanges(changes: Automerge.Change[]) {
    const msg: ChangeMessage = {
      action: Action.CHANGES,
      team: 'awesome_team',
      payload: JSON.stringify(changes),
    };
    if (this.isConnectionOpen && this.ws) {
      this.ws.send(JSON.stringify(msg));
    }
  }
}

export default new SocketConnection();
