'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Main from '@/components/layouts/Main';
import genId from '@/utils/genId';
import type { DateSelectArg, EventChangeArg, EventInput, SlotLabelContentArg } from '@fullcalendar/core'
import { formatAMPM, toWeekdayStr } from '@/utils/time';
import { ColorPicker, Modal, Space, TimePicker, Typography } from 'antd';
import EditableText from '@/components/common/EditableText';
import dayjs from 'dayjs';
import { SaveButton } from '@/components/common/(MyButton)/SaveButton';
import { IoCalendarOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { THEME } from '@/styles/theme';
import { MdOutlinePlace } from 'react-icons/md';
import _, { isUndefined } from 'lodash';
import { EventImpl } from '@fullcalendar/core/internal';
import DangerButton from '@/components/common/(MyButton)/DangerButton';
import SubjectDescriptionIcon from '@/components/common/(Icons)/SubjectIcons/SubjectDescription';
import TitleWithBox from '@/components/common/TitleWithBox';
import '../../../../styles/css/full-calendar.css';
import { EventInfo } from '@/types/event';
import useSWR from 'swr';
import { EventAPI } from '@/api/eventAPI';
import { toast } from 'react-toastify';

const { Text, Paragraph } = Typography;

function changeEvent(eventInfo: EventImpl, oldEvent: EventInfo): EventInfo {
    return {
        ...oldEvent,
        'id': eventInfo.id,
        name: eventInfo.title,
        timeStart: (eventInfo.start ?? oldEvent.timeStart),
        timeEnd: (eventInfo.end ?? oldEvent.timeEnd)
    }
}

export default function CalendarPage() {
    const { data: events, mutate: mutateEvents, isLoading } = useSWR('get all event', EventAPI.getEventsInWeek);
    // const [events, setEvents] = useState<EventInfo[]>([]);
    const ref = useRef<FullCalendar>(null);
    const eventsInput = useMemo<EventInput[]>(() => {
        if (isUndefined(events))
            return []
        // console.log(events[0].timeStart.toLocaleString(), events[0].timeEnd.toLocaleString())
        return events?.map((event) => ({
            id: event.id,
            start: event.timeStart,
            end: event.timeEnd,
            title: event.name
        }))
    }, [events])
    // console.log(eventsInput)
    return (
        <Main title='Lịch làm việc'>
            <div className='flex flex-col'>
                <TitleWithBox title='Học kì hiện tại' />
                <FullCalendar
                    ref={ref}
                    editable
                    selectable
                    plugins={[timeGridPlugin, interactionPlugin]}
                    select={handleSelect}
                    eventChange={handleChangeEvent}
                    initialView='timeGridWeek'
                    headerToolbar={{
                        left: '',
                        center: '',
                        right: ''
                    }}
                    events={eventsInput}
                    dayHeaderContent={(event) => <HeaderCell date={event.date} />}
                    stickyHeaderDates
                    dayHeaderClassNames={'!border-0 !border-b'}
                    allDaySlot={false}
                    titleFormat={''}
                    slotDuration={'00:60:00'}
                    slotLabelContent={(label) => <SlotContent label={label} />}
                    eventClassNames={'bg-transparent !border-0 !p-0 !shadow-none'}
                    slotLabelClassNames={'!border-0'}
                    // weekNumberClassNames={'!border-0'}
                    eventContent={(e) => {
                        return (
                            <EventContent
                                event={getEventById(e.event.id)}
                                onSave={(newEvent) => updateEvent(newEvent)}
                                onDrop={(eventId) => handleDropEvent(eventId)}
                            />
                        )
                    }}
                />

            </div>
        </Main>
    );

    function handleChangeEvent(change: EventChangeArg): void {
        if (isUndefined(events))
            return;
        mutateEvents(events.map((event): EventInfo => {
            if (event.id === change.event.id) {
                const updatedEvent = changeEvent(change.event, event);
                EventAPI.updateEvent(updatedEvent)
                    .then(({ ok }) => {
                        if (!ok)
                            toast.error('Cập nhật sự kiện thất bại')
                    })
                return updatedEvent;
            }
            return event;
        }), {
            revalidate: false
        })
    }

    function handleSelect(data: DateSelectArg) {
        const newEvent: EventInfo = {
            justCreated: true,
            'id': genId(),
            'color': '#039BE5',
            'name': 'Chưa có tiêu đề',
            'timeStart': data.start,
            'timeEnd': data.end,
            'location': '',
            'info': ''
        };
        console.log('first')
        EventAPI.createEvent(newEvent)
            .then(({ eventId }) => {
                newEvent.id = eventId;
                mutateEvents((oldEvents): EventInfo[] => {
                    return [...oldEvents ?? [], newEvent]
                }, {
                    revalidate: false
                })
            })
    }

    function getEventById(id: string): EventInfo | undefined {
        // console.log({id});
        // console.log({events})
        return _.find(events, (event) => event.id === id)
    }

    function updateEvent(newEvent: EventInfo) {
        mutateEvents(events?.map((event) => (event.id === newEvent.id ? newEvent : event)), {
            revalidate: false
        })
        EventAPI.updateEvent(newEvent)
            .then(({ ok }) => {
                if (!ok)
                    toast.error('Cập nhật sự kiện thất bại')
            })
    }

    function handleDropEvent(id: string) {
        mutateEvents(_.filter(events, (event) => event.id !== id), {
            revalidate: false
        });
        EventAPI.deleteEvent(id)
            .then(({ ok }) => {
                if (!ok)
                    toast.error('Xoá sự kiện thất bại')
            })
    }
}

const HeaderCell = ({
    date
}: {
    date: Date
}) => {
    const currentDay: number = new Date().getDay();
    return (
        <div className="w-full h-full font-medium flex flex-col items-center text-royal-gray gap-2">
            {toWeekdayStr(date)}
            <div className={`${currentDay === date.getDay() ? 'bg-blue-300 text-secondary' : ''} rounded-full w-[40px] h-[40px] relative`}>
                <span className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl'>
                    {date.getDate()}
                </span>
            </div>
        </div>
    )
}

const SlotContent = ({
    label
}: {
    label: SlotLabelContentArg
}) => {
    const formatedTime = label.text.toUpperCase().replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    return (
        <div className='px-2 py-3'>
            <Text className='text-sm' strong type='secondary'>
                {formatedTime}
            </Text>
        </div>
    )
}

function EventContent({
    event: __event,
    onSave,
    onDrop
}: {
    event: EventInfo | undefined
    onSave: (event: EventInfo) => void
    onDrop: (eventId: string) => void
}) {
    const [newEvent, setNewEvent] = useState<typeof __event>(__event);
    const [editting, setEditting] = useState<boolean>(__event?.justCreated ?? false);
    useEffect(() => setNewEvent(__event), [__event]);

    // console.log(__event)
    if (isUndefined(newEvent) || isUndefined(__event))
        return <></>
    return (
        <>
            <div className='w-full h-full rounded-md pl-2' onClick={() => setEditting(true)}
                style={{ backgroundColor: __event.color }}
            >
                <Paragraph className='text-secondary'>
                    {__event.name} <br />
                    {`${formatAMPM(__event.timeStart)} - ${formatAMPM(__event.timeEnd)}`}
                </Paragraph>
            </div>
            <Modal
                // key={event.id}
                title={
                    <TitleWithBox
                        title={
                            <Text className='text-xl'>
                                <EditableText
                                    defaultValue={newEvent.name ?? ''}
                                    normalText={newEvent.name}
                                    onComplete={(title) => setNewEvent({ ...newEvent, name: title })}
                                />
                            </Text>
                        }
                        color={newEvent.color}
                    />
                }
                // placement='right'
                onCancel={() => setEditting(false)}
                open={editting}
                afterOpenChange={() => setNewEvent({ ...newEvent, justCreated: false })}
                destroyOnClose
                footer={[]}
            >
                <Space direction='vertical' size={'large'} className='mt-5 w-full'>
                    <Space size={'middle'}>
                        <IoCalendarOutline size={25} color={THEME.ROYAL_GRAY_COLOR} />
                        <TimePicker.RangePicker
                            placeholder={['Bắt đầu', 'Kết thúc']}
                            defaultValue={[dayjs(newEvent.timeStart), dayjs(newEvent.timeEnd)]}
                            onChange={(values) => {
                                console.log(values?.[0]?.toString())
                                console.log(values?.[1]?.toDate())
                                setNewEvent({
                                    ...newEvent,
                                    timeStart: values?.[0]?.toDate() ?? new Date(),
                                    timeEnd: values?.[1]?.toDate() ?? new Date(),
                                })
                            }}
                            use12Hours
                            className='w-[250px]'
                        />
                    </Space>
                    <Space size={'middle'}>
                        <MdOutlinePlace size={25} color={THEME.ROYAL_GRAY_COLOR} />
                        <Text className='text-base'>
                            <EditableText
                                defaultValue={newEvent.location || ''}
                                normalText={newEvent.location || 'Chưa nhập địa điểm'}
                                editing={isUndefined(newEvent.location)}
                                placeholder='Nhập địa điểm'
                                onComplete={(location) => setNewEvent({ ...newEvent, location })}
                            />
                        </Text>
                    </Space>
                    <div className='flex items-start gap-5'>
                        <SubjectDescriptionIcon size={25} />
                        <Text className='text-base w-full'>
                            <EditableText
                                defaultValue={newEvent.info || ''}
                                normalText={newEvent.info || 'Không có mô tả'}
                                placeholder='Nhập mô tả'
                                editing={isUndefined(newEvent.info)}
                                type='textarea'
                                className='w-full'
                                onComplete={(description) => {
                                    // if (description !== '')
                                    setNewEvent({ ...newEvent, info: description })
                                }}
                            />
                        </Text>
                    </div>
                    <Space size={'middle'}>
                        <IoColorPaletteOutline color={THEME.ROYAL_GRAY_COLOR} size={25} />

                        <ColorPicker value={newEvent.color} onChange={(_, color) => setNewEvent({ ...newEvent, color })} showText />
                    </Space>
                    <Space className='justify-end w-full'>
                        <DangerButton onClick={() => { onDrop(newEvent.id); setEditting(false) }}>
                            Xoá sự kiện
                        </DangerButton>
                        <SaveButton onClick={() => { onSave(newEvent); setEditting(false) }}>
                            Lưu lại
                        </SaveButton>
                    </Space>
                </Space>
            </Modal>
        </>


    )
}
