'use client'
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useRef, useEffect, useState } from "react"
import { SocketContext } from "@/context/SocketProviders"
import CopyUrl from './Copyurl'
import home from '../../src/assets/Home.png' 
import logo from '../../public/dialpad-logo.png'
 import video from '../../src/assets/Video.png'
  import calender from '../../src/assets/Calendar.png'
  import adduser from '../../src/assets/Add User.png'
 
import { Mic, MicOff, Video, PhoneOff, VideoOff } from 'lucide-react';
interface Peer {
    stream: MediaStream
    username?: string
}

export default function LandingTest() {
    const params = useParams()
    const id = params.id as string
    const { socket, user, stream, peers, username } = useContext(SocketContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    useEffect(() => {
        if (user) {
            console.log("New user with id", user._id, "has joined room", id)
            socket.emit("joined-room", { roomId: id, peerId: user._id, username })
        }
    }, [id, user, socket, username])

    const totalParticipants = Object.keys(peers).length + 1
const navigate = useNavigate()
    const items = [
        { icon: home, alt: 'Home' },
        { icon: video, alt: 'Video' },
        { icon: calender, alt: 'Calendar' }
    ]

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream
        }
    }, [stream])
    const toggleMute = () => {
        if (stream) {
          const audioTrack = stream.getAudioTracks()[0];
          if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!audioTrack.enabled);
          }
        }
      };
    
      const toggleVideo = () => {
        if (stream) {
          const videoTrack = stream.getVideoTracks()[0];
          if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setIsVideoOff(!videoTrack.enabled);
          }
        }
      };
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <nav className="md:w-20 bg-newwhite p-4 md:p-6 flex md:flex-col justify-between items-center">
                <img src={logo} alt="Logo" width={25} height={25} className="mb-8" />
                <div className="flex md:flex-col gap-8 ">
                    {items.map((item, index) => (
                        <img key={index} src={item.icon} alt={item.alt} width={25} height={25} />
                    ))}
                </div>
            </nav>

            <main className="flex-grow flex flex-col">
                <header className="bg-newwhite  p-4 m-2 rounded-3xl flex flex-wrap items-center justify-between gap-4">
                    <h1 className="font-anzo text-xl">Preparing For The Holiday</h1>
                    <div className="flex items-center gap-4">
                        <span className='font-anzo text-gray-500 text-xl font-bold'>{totalParticipants}</span>
                        <button onClick={() => setIsModalOpen(true)}>
                            <img src={adduser} alt="Add user" width={40} height={40} />
                        </button>
                    </div>
                </header>

                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        <div className='relative'>
                            <video
                                ref={videoRef}
                                className="w-2/3 ml-16 sm:w-full h-72 sm:h-72 object-cover rounded-2xl transform scale-x-[-1]"
                                autoPlay
                                 muted
                                playsInline
                            />
                            <div className="absolute ml-20 bottom-2 left-2 bg-black bg-opacity-50 rounded-2xl text-white px-2 py-1 text-sm">
                                You ({username})
                            </div>
                        </div>
                        
                        {Object.entries(peers).map(([peerId, peer]) => (
                            <div key={peerId} className="relative">
                                <video
                                    autoPlay
                                    playsInline
                                
                                    ref={(videoElement) => {
                                        if (videoElement) {
                                            videoElement.srcObject = (peer as Peer).stream
                                        }
                                    }}
                                    className="w-2/3 ml-16 sm:w-full h-72 sm:h-72 object-cover rounded-2xl transform scale-x-[-1]"
                                    />
                                <div className="absolute bottom-2 ml-24 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                    {(peer as Peer).username || `Participant ${peerId.slice(0, 4)}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            <div className="fixed ml-3 rounded-3xl bottom-0 left-0 right-0 md:relative bg-newwhite p-4 flex justify-center items-center gap-4">
                    <button
                        onClick={toggleMute}
                        className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={toggleVideo}
                        className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        aria-label={isVideoOff ? "Turn on camera" : "Turn off camera"}
                    >
                        {isVideoOff ? <VideoOff  className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={()=>navigate('/')}
                        className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        aria-label={isVideoOff ? "Turn on camera" : "Turn off camera"}
                    >
                        <PhoneOff color="#ec0909" strokeWidth={2}/>
                    </button>
                </div></main>
            <CopyUrl isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

