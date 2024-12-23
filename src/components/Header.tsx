
import dialpad from '../../src/assets/dialpadlogo-ai-2x.png'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
export default function Header(){
const navigate = useNavigate()
  return (
    <div className='w-full h-14 flex hover:shadow-xl '>
<div className='w-1/2 px-8 py-5  flex gap-2'>
<img src={dialpad} alt="" width={110} onClick={()=>{navigate('/')}}  />

</div>
    <div className='px-4 w-1/2  py-3 flex items-end justify-end gap-5  '>
    
      <Button size="sm" className='font-anzo rounded-full  text-lg h-8 hover:text-white hover:bg-black  bg-lavender text-white' onClick={()=>{
        navigate(`/createroom`)
      }}>Get a demo</Button>
    </div>
    </div>
  )
}