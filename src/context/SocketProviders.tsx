import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { io, Socket as SocketIOClient } from "socket.io-client";

// Define a type for the Socket
type SocketContextType = SocketIOClient | null;

// Create a context with the initial value as null
const SocketContext = createContext<SocketContextType>(null);

// Define the type for the provider props
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  // Memoize the socket instance to avoid re-creating it on every render
  const socket = useMemo(() => io("http://localhost:8000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

// Hook to use the SocketContext
export const useSocket = (): SocketIOClient => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return socket;
};
