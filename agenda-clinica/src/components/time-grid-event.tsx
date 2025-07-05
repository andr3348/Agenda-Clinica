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

    return (
    <div ref={ref} id='EventFrame' style={{ backgroundColor: calendarEvent.colorHex,
                width: '100%', height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#FFF',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.3',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }}>
        <span>{calendarEvent.title}</span>
        {showTime && (
            <span>
                {calendarEvent.start} - {calendarEvent.end}
            </span>
        )} 
    </div>
    );
}