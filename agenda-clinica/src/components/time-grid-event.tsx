import type { CalendarEvent } from '@schedule-x/calendar';
import { useEffect, useRef, useState } from 'react';

type props = {
    calendarEvent: CalendarEvent
}

export default function TimeGridEvent({ calendarEvent }: props) {
    const ref = useRef<HTMLDivElement>(null);
    const [showTime, setShowTime] = useState(true);
    
    useEffect(() => {
        const el = ref.current as HTMLDivElement;

        const handleResize = () => {
            setShowTime(el.offsetHeight > 75);
        };

        handleResize();

        const observer = new window.ResizeObserver(handleResize);
        observer.observe(el);

        return () => observer.disconnect();
    },[])

    const reservadoStyles = 'bg-[hsl(30,80%,85%)] border-l-[6px] border-l-[hsl(30,100%,55%))] h-full';
    const confirmadoStyles = 'bg-[hsl(110,80%,85%)] border-l-[6px] border-l-[hsl(110,100%,55%))] h-full';
    const enAtencionStyles = 'bg-[hsl(230,80%,85%)] border-l-[6px] border-l-[hsl(230,100%,55%))] h-full';
    const noContestaStyles = 'bg-[hsl(0,80%,85%)] border-l-[6px] border-l-[hsl(0,100%,55%))] h-full';
    const unknownStateStyles = 'bg-[hsl(0,0%,85%)] border-l-[6px] border-l-[hsl(0,0%,55%))] h-full';

    return (
    <div ref={ref} id='EventFrame' className={
        calendarEvent.estado == 'Reservado' ? `${reservadoStyles} flex flex-col justify-center items-center` : 
        calendarEvent.estado == 'Confirmado' ? `${confirmadoStyles} flex flex-col justify-center items-center` :
        calendarEvent.estado == 'En atención' ? `${enAtencionStyles} flex flex-col justify-center items-center`:
        calendarEvent.estado == 'No contesta' ? `${noContestaStyles} flex flex-col justify-center items-center` :
        `${unknownStateStyles} flex flex-col justify-center items-center`}>
        <span>{calendarEvent.title}</span>
        {showTime && (
            <span>
                {calendarEvent.start} - {calendarEvent.end}
            </span>
        )} 
    </div>
    );
}