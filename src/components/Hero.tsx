'use client'

import { Button } from "./ui/button";
import { MoveUpRight } from 'lucide-react';
import { useNavigate  } from "react-router-dom";
import square from '../../src/assets/icon-gradient-square.svg'
import circle from '../../src/assets/icon-gradient-circle.svg'
import triangle from '../../src/assets/icon-gradient-triangle (1).svg'
import video from '../../src/assets/WhatsApp Video 2024-12-22 at 13.51.25_a8f47082.mp4'

import Footer from "./Footer";
export default function Hero() {
    const router = useNavigate();

    const items = [
        { 
            icon: square, 
            title: 'Dialpad Connect', 
            description: 'An all-in-one customer communication platform with AI that takes notes, delivers insights, and helps your team stay productive.',
            buttonText: 'Find Out More'
        },
        { 
            icon: circle,
            title: 'Dialpad Support', 
            description: 'Cloud-based support and contact center solution with AI that helps expedite onboarding, simplify coaching, and delight customers.',
            buttonText: 'Get Details'
        },
        { 
            icon: triangle,
            title: 'Dialpad Sell', 
            description: 'Cloud-based sales outreach solution with AI that automates playbooks, gives in-call coaching, and helps your team win.',
            buttonText: 'Learn more'
        }
    ];

    return (
        <>
            <div className="w-full min-h-screen p-4 md:p-16 text-center">
                <div className="text-center text-2xl md:text-4xl font-anzo font-bold">
                    Empower your team. <br />Delight your customers.
                </div>
                <p className="font-anzo font-light text-sm md:text-base mt-4 md:mt-5">
                    Grow top-tier support and sales teams—all in one AI-powered customer communications platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
                    <Button 
                        size="sm" 
                        className='rounded-full h-10 px-4 font-anzo text-sm hover:text-white hover:bg-black bg-lavender text-white w-full sm:w-auto' 
                        onClick={() => router('/getDemo')}
                    >
                        Request a demo
                    </Button>
                    <div className="flex items-center mt-4 sm:mt-0">
                        <div 
                            className="underline font-anzo text-bold cursor-pointer"
                            onClick={() => router('/dashboard')}
                        >
                            See it in action
                        </div>
                        <MoveUpRight className="text-lavender ml-1" size={20} />
                    </div>
                </div>

                <div className="video mt-10">
                    <video src={video} autoPlay muted loop className="w-full"></video>
                </div>

                <div className="mt-10">
                    <div className="font-bold font-anzo text-xl md:text-2xl">
                        DialPad Works For Everyone
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-6 gap-6">
                        {items.map((item, index) => (
                            <div key={index} className="w-full md:w-1/3 p-4 bg-black bg-opacity-5 flex flex-col justify-center items-center mb-4 md:mb-0">
                                <img src={item.icon} alt="" width={30} height={30} className="mb-4"/>
                                <h1 className="font-anzo text-lg font-bold">{item.title}</h1>
                                <p className="font-anzo font-normal text-xs md:text-sm mt-2">{item.description}</p>
                                <Button size="sm" className='mt-3 rounded-full h-7 text-xs hover:text-white hover:bg-black bg-lavender text-white'>
                                    {item.buttonText}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 md:mt-20">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 justify-items-center">
                        {[
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-tmobile-muted.svg&w=256&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-nasdaq-muted.svg&w=128&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-netflix-muted.svg&w=256&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-aaa-insurance-muted.svg&w=64&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-randstad-muted.svg&w=256&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-sunrun-muted.svg&w=256&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-uber-muted.svg&w=96&q=75',
                            'https://www.dialpad.com/_next/image/?url=%2Fassets%2Fimages%2Flogos%2Flogo-remax-muted.svg&w=256&q=75'
                        ].map((src, index) => (
                            <img key={index} src={src} alt="" width={70} height={35} className="w-16 md:w-20" />
                        ))}
                    </div>
                </div>

                <Button size="sm" className='mt-8 rounded-full h-7 text-xs hover:text-white hover:bg-black bg-lavender text-white'>
                    Know our customers
                </Button>
            </div>
<Footer/>
       
        </>
    )
}

