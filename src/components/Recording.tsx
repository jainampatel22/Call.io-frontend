import  { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { Square, Video  } from 'lucide-react';

export default function Recording() {
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const recordedChunks = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);


    const startRecording = useCallback(async () => {
        const Videostream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const tracks = [...Videostream.getTracks(), ...audioStream.getAudioTracks()]
        const combinedStream = new MediaStream(tracks)
        mediaRecorder.current = new MediaRecorder(combinedStream)
        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data)
            }
        }

        mediaRecorder.current.onstop = () => {
            const recordedBlob = new Blob(recordedChunks.current, { type: 'video/webm' });
            const url = URL.createObjectURL(recordedBlob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = 'Meeting-Recording.webm';
            a.click();
            window.URL.revokeObjectURL(url);
            recordedChunks.current = [];


}
        
        
        
        ;
        mediaRecorder.current.start()
        setIsRecording(true)
    }, [])
    const stopRecording = useCallback(async () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop()
            setIsRecording(false)
        }
    }, [isRecording])
    return (
        <>
    <div>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        variant="outline"
        className={`p-4 rounded-full transition-colors ${
          isRecording ? 'bg-red-200 hover:bg-red-300' : 'bg-gray-200 hover:bg-gray-300 border-2 border-red-700'
        }`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? <Square className="w-6 h-6" /> : <Video className="w-6 h-6" />}
      </Button>
      <p>{isRecording ? '' : ''}</p>
    </div>
        </>
    )

}