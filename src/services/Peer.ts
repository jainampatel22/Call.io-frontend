class PeerService {
  peer: RTCPeerConnection | null = null;
  socket: any;

  constructor(socket: any) {
    this.socket = socket;

    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302',
            ],
          },
        ],
      });
    }

    // Handling ICE candidate events
    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate');
        this.socket.emit('new-ice-candidate', event.candidate);
      }
    };
  }

  async getAnswer(offer: RTCSessionDescriptionInit) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async setLocalDescription(ans: RTCSessionDescriptionInit) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  // Function to add local media stream tracks to peer connection
  addLocalStream(stream: MediaStream) {
    if (this.peer) {
      stream.getTracks().forEach(track => {
        this.peer?.addTrack(track, stream);
      });
    }
  }
}

export default PeerService;
