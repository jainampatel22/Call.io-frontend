import Header from "./Header";
import frame from '../../src/assets/Frame.png'
import tick from '../../src/assets/tickmar.png'
import img from '../../src/assets/Image.png'
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen">
            <Header />
            <div className="container mx-auto px-4 mt-8 md:mt-14">
                <div className="text-center">
                    <h1 className="font-anzo text-base md:text-lg">DailPad for Team Alignment</h1>
                    <h1 className="font-anzo text-3xl md:text-5xl mt-4">Move Fast And Stay Connected!</h1>
                    <h4 className="font-anzo text-base md:text-lg mt-4">Use the power and flexibility of async video to accelerate team communication and boost productivity.</h4>
                    <img className="mt-8 md:mt-14 w-full max-w-3xl mx-auto" src={frame} alt="Frame" />

                    <div className="mt-12 md:mt-20">
                        <h1 className="font-anzo text-2xl md:text-4xl">Why Teams Connect with Dailpad</h1>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center mt-6 md:mt-10">
                            <div className="flex items-center gap-3">
                                <img src={tick} alt="Tick" className="w-8 h-8" />
                                <h4 className="font-anzo text-base md:text-lg">To Collaborate asynchronously</h4>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={tick} alt="Tick" className="w-8 h-8" />
                                <h4 className="font-anzo text-base md:text-lg">To Train and Build Teams</h4>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-4 md:mt-6">
                            <img src={tick} alt="Tick" className="w-8 h-8" />
                            <h4 className="font-anzo text-base md:text-lg">To Send Updates and Announcements</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 px-4 md:px-9">
                    <img src={img} className="w-full max-w-lg mx-auto" alt="Experience" />
                </div>
                <div className="w-full md:w-1/2 px-4 md:px-9 mt-8 md:mt-0">
                    <div className="font-anzo text-3xl md:text-6xl text-center md:text-left">Experience DailPad</div>
                    <p className="mt-4 text-base md:text-lg text-gray-600 text-center md:text-left">
                        Join the ultimate platform to connect, collaborate, and create effortlessly. 
                        Whether you're hosting or participating, we've got you covered!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6 sm:ml-16">
                        <Button 
                            size="lg"
                            className="w-full sm:w-auto rounded-full py-2 px-6 hover:text-white hover:bg-black text-base md:text-lg bg-indigo-600 text-white"
                            onClick={() => navigate('/createroom')}
                        >
                            Create Your Room
                        </Button>
                        <Button 
                            size="lg"
                            className="w-full sm:w-auto rounded-full py-2 px-6 hover:text-white hover:bg-black text-base md:text-lg bg-indigo-600 text-white"
                            onClick={() => navigate('/joinroom')}
                        >
                            Join a Room
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

