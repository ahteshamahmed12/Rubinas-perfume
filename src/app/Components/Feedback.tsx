import React from 'react'
import { MessageCircle } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
  
const FeedBack = () => {
    let feedbackcard =[
        {   
            
            name:"Ahtesham",
            description:"The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth!"

        },
        {   
            
            name:"Ghufran",
            description:"his customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth!"

        },
        
            {   
            
                name:"Salman",
                description:"jim customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth!"
    
            }
        
    ]
  return (
    <>
    <main className='mt-10'>
        <div>
            <h4 className='text-black text-3xl font-serif text-center'>Feedback Corner</h4>
        </div>
        <div className='flex flex-col items-center md:flex-row justify-evenly pt-12 md:pt-20 md:px-10  pb-10 gap-8 md:gap-5  '>
            {
                feedbackcard.map((e,i)=>{
                    return(
                        <div key={i} className={`  rounded-xl w-[300px] md:w-[350px] border-[1.5px] border-transparent shadow-lg shadow-slate-300 ${i == 1 && ' bg-[#bc4444] text-black'} `}>
                            <div className=' px-4 pt-2  pb-2 ' >
                                
                                <MessageCircle  />
                                
                                <h1 className='text-xl text-[#black] font-serif pt-3 text-center md:text-left '>{e.name}</h1>
                                <p className='pt-2 text-[#24224f]'>{e.description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='text-center hidden md:block pb-10'>
            <button className='p-2 border-[1.5px] border-[#24224F] '><ChevronLeft /></button>
            <button className='p-2 border-[1.5px] bg-[#bc4444] ml-4 text-white '><ChevronRight /></button>
        </div>
    </main>
    </>
  )
}

export default FeedBack