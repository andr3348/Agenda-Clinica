import type { CalendarEvent } from '@schedule-x/calendar';

type props = {
    calendarEvent: CalendarEvent
}

export default function TimeGridEvent({ calendarEvent }: props) {
    return (
    <div style={{ backgroundColor: calendarEvent.colorHex,
                width: '100%', height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
    }}>
        <span>{calendarEvent.title}</span>
        <span>{calendarEvent.start} - {calendarEvent.start}</span>
    </div>
    );
}