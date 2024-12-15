import { Input } from "./ui/input";

export default function Reciver(){
    return (
        <>
        <div className="flex  w-full min-h-screen">
            <div className="min-h-screen w-[70%] justify-start border-r-2 border-black">Reciver Video's</div>
            <div className="min-h-screen w-[30%]  justify-end">
            <div className="text-blue-600 text-3xl font-mono font-semibold flex justify-center items-center mt-20">Chat</div>
           <div className="flex">
           <div className="rounded-lg ">
                <Input type='text'/>
            </div>
           </div>
            </div>
        </div>
        </>
    )
}