import { useState } from 'react'
import { Actions } from '../../Actions';

export const BtnActionsMenu = () => {
    const [iconToggle, setIconToggle] = useState(false);

    const handleClick = () => {
        setIconToggle(!iconToggle);
    }

    return (
        <>
            <div className='flex flex-col gap-2'>
                <button type='button' onClick={handleClick}
                    className='justify-center items-center 
        bg-[#fff] border-[1px] border-[#999] text-[#999] text-2xl
        cursor-pointer py-3 px-4 rounded-full hover:bg-[hsl(0,0%,98%)]
        min-w-14 transition-all duration-200'>
                    {
                        iconToggle && '-' || '+'
                    }
                </button>

                {
                    iconToggle && (<Actions/>) || null
                }
            </div>
        </>
    )
}
