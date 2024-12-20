import { ADD_PEER, REMOVE_PEER } from "../Actions/peerActions";

export type PeerState = Record<string, {stream: MediaStream}>;


type PeerAction = {
    type: typeof ADD_PEER,
    payload: {
      [x: string]: any;peerId: string, stream: MediaStream
}
} | {
    type: typeof REMOVE_PEER,
    payload: {peerId: string}
}

export const peerReducer = (state: PeerState, action: PeerAction) => {
    switch(action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream,
                    name:action.payload.username
                }
            }
        case REMOVE_PEER:
            return { ...state };
        default:
            return { ...state };
    }
}