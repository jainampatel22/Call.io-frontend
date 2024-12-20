export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;

export const addPeerAction = (peerId: string, stream: MediaStream,username:string) => ({
    type: ADD_PEER,
    payload: {peerId, stream,username}
});

export const removePeerAction = (peerId: string) => ({
    type: REMOVE_PEER,
    payload: {peerId}
});