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
import ChatSidebar from "./Chat"
import Recording from "./Recording"
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
      const getGridClass = () => {
        switch(totalParticipants) {
            case 1:
            case 2:
                return 'grid-cols-1 md:grid-cols-2'
            case 3:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            default:
                return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }
    }

    
    const getVideoClass = () => {
        switch(totalParticipants) {
            case 1:
            case 2:
                return 'h-60 md:h-[calc(100vh-16rem)]'
            case 3:
                return 'h-60 md:h-[calc(75vh-12rem)]'
            default:
                return 'h-60'
        }
    }

    


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
                <header className="bg-newwhite  p-3 m-2 rounded-3xl flex flex-wrap items-center justify-between gap-4">
                    <h1 className="font-anzo text-xl">Preparing For The Holiday</h1>
                    <div className="flex items-center gap-4">
                        <span className='font-anzo text-gray-500 text-xl font-bold'>{totalParticipants}</span>
                        <button onClick={() => setIsModalOpen(true)}>
                            <img src={adduser} alt="Add user" width={40} height={40} />
                        </button>
                    </div>
                </header>

                <div className="flex-grow p-5 overflow-y-auto">
                    <div className={`grid ${getGridClass()} gap-8`}>
                        <div className='relative'>
                            <video
                                ref={videoRef}
                                className={`w-full object-cover sm:ml-4 rounded-2xl transform scale-x-[-1] ${getVideoClass()}`}
                      
                                autoPlay
                                 muted
                                playsInline
                            />
                            <div className="absolute sm:ml-10 bottom-2 left-2 bg-black bg-opacity-50 rounded-2xl text-white px-2 py-1 text-sm">
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
                                    className={`w-full object-cover  rounded-2xl transform scale-x-[-1] ${getVideoClass()}`}
                      
                                   />
                                <div className="absolute bottom-2 sm:ml-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
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
                    <Recording/>
                </div>
                <ChatSidebar 
                    socket={socket} 
                    username={username} 
                    roomId={id}
                    
                />
                </main>
            <CopyUrl isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

