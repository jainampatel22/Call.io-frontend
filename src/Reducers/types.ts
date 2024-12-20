export interface PeerState {
    [key: string]: MediaStream;
  }
  export type PeerAction = 
  | { type: 'ADD_PEER'; payload: { peerId: string; stream: MediaStream } }
  | { type: 'REMOVE_PEER'; payload: { peerId: string } };