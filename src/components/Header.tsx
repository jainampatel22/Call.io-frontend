
import dialpad from '../../src/assets/dialpadlogo-ai-2x.png'

import { useNavigate } from 'react-router-dom'
export default function Header(){
const navigate = useNavigate()
  return (
    <div className='w-full h-14 flex hover:shadow-xl '>
<div className='w-1/2 px-8 py-5  flex gap-2'>
<img src={dialpad} alt="" width={110} onClick={()=>{navigate('/')}}  />

</div>
    </div>
  )
}