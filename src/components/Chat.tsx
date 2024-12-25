'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { Input } from './ui/input'

interface Message {
  text: string
  username: string
  timestamp: Date
}

interface ChatSidebarProps {
  socket: any
  username: string
  roomId: string
}

export default function ChatSidebar({ socket, username, roomId }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (msg: Message) => {
      setMessages(prev => [...prev, msg])
    }

    socket.on('chat-message', handleNewMessage)

    return () => {
      socket.off('chat-message', handleNewMessage)
    }
  }, [socket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !socket) return
console.log('hi')
    const newMessage = {
      text: message,
      username,
      timestamp: new Date()
    }

    socket.emit('chat-message', { message: newMessage, roomId })
    setMessage('')
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-24 z-50 p-3 bg-newwhite rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full bg-newwhite w-80 shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40`}
      >
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 ">
            <h2 className="text-lg font-semibold font-anzo">Chat</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.username === username ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.username === username
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-lg">{msg.text}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.username} • {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form  className="p-4 border-t">
            <div className="flex gap-2">
           
              <Input   type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
              <button
                type="submit" onClick={sendMessage}
                className="p-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

