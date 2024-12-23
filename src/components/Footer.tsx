import footerimg from '../../src/assets/img-background-get-started (1).svg'
import { Button } from './ui/button'

export default function Footer(){
   
    return (
        <>
       <div className="relative text-center">
  <img
    src={footerimg}
    alt="Background for request a demo section"
    width={1920}
    height={100}
    className="w-full object-cover h-[200px] sm:h-[300px]" 
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
    <h1 className="font-anzo mt-3 text-white text-base sm:text-2xl md:text-4xl font-extrabold mb-4">
      Request a Demo
    </h1>
    <p className="font-anzo text-white text-xs sm:text-sm md:text-base text-center leading-relaxed sm:leading-normal">
      Learn how Dialpad can help you grow a high-performing sales and support <br className="hidden sm:inline" /> 
      team and deliver an amazing customer experience.
    </p>
    <Button
      size="lg"
      className="mt-5 rounded-full h-11 font-anzo text-xl px-6  sm:text-sm hover:text-black hover:bg-white bg-black text-white"
   onClick={()=>{
window.location.href="https://x.com/Jainam___patel/"
   }}
   >
      Talk to Sales
    </Button>
  </div>
</div>

        </>
    )
}