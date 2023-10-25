import { THEME } from '@/styles/theme';
import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const toSeconds = {
    days: 86400,
    hours: 3600,
    minutes: 60,
    seconds: 1,
}

type TimeUnit = keyof typeof toSeconds;

const unitToText: Record<TimeUnit, string> = {
    days: 'Ngày',
    hours: 'Giờ',
    minutes: 'Phút',
    seconds: 'Giây'
}

function convertSeconds(unit: TimeUnit, seconds: number): number {
    switch (unit) {
        case 'days':
            return Math.floor(seconds / toSeconds.days);
        case 'hours':
            return Math.floor((seconds % toSeconds.days) / toSeconds.hours);
        case 'minutes':
            return Math.floor((seconds % toSeconds.hours) / toSeconds.minutes);
        case 'seconds':
            return Math.floor(seconds);
    }
}

export default function MyCountDown({
    duration,
    onComplete
}: {
    duration: number,
    onComplete?: () => void
}) {
    return (
        <div>
            <div className='w-0 h-0'>
                <svg>
                    <defs>
                        <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="5%" stopColor={THEME.PRIMARY_COLOR} />
                            <stop offset="95%" stopColor={THEME.LIGHT_PRIMARY_COLOR} />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className='flex'>
                <Countdown
                    duration={toSeconds.days * 7}
                    remainingTime={duration} unit='days'
                    hasColon
                    shouldRepeat={(totalElapsedTime) => duration-totalElapsedTime > toSeconds.days}
                />
                <Countdown
                    duration={toSeconds['days']}
                    remainingTime={duration % toSeconds.days}
                    unit='hours'
                    hasColon
                    shouldRepeat={(totalElapsedTime) => duration-totalElapsedTime > toSeconds.hours}
                />
                <Countdown
                    duration={toSeconds['hours']}
                    remainingTime={duration % toSeconds.hours}
                    unit='minutes'
                    hasColon
                    shouldRepeat={(totalElapsedTime) => duration-totalElapsedTime > toSeconds.minutes}
                />
                <Countdown
                    duration={toSeconds.minutes}
                    remainingTime={duration % toSeconds.minutes + 0.01}
                    unit='seconds'
                    shouldRepeat={(totalElapsedTime) => {
                        if (duration-totalElapsedTime > 0)
                            return true;
                        onComplete?.();
                        return false;
                    }}
                />
            </div>
        </div>
    )
}

function Countdown({
    duration,
    remainingTime,
    unit,
    hasColon = false,
    shouldRepeat
}: {
    duration: number
    remainingTime: number
    unit: TimeUnit
    hasColon?: boolean
    shouldRepeat: (totalElapsedTime: number) => boolean
}) {
    return (
        <div className="grid grid-cols-[auto_auto] grid-rows-2 w-fit">
            <div className="flex items-center justify-center">
                <CountdownCircleTimer
                    colors="url(#your-unique-id)"
                    duration={duration}
                    initialRemainingTime={remainingTime}
                    isPlaying
                    size={35}
                    strokeWidth={3}
                    onComplete={(totalElapsedTime) => {
                        return {
                            shouldRepeat: shouldRepeat(totalElapsedTime)
                        }
                    }}
                >
                    {({ remainingTime, elapsedTime, color }) => {
                        return <div className={`text-primary`}>{convertSeconds(unit, duration - elapsedTime)}</div>;
                    }}
                </CountdownCircleTimer>
            </div>
            {
                hasColon ?
                    <div className="p-2">:</div>
                    :
                    <div></div>
            }
            <div className="flex items-center justify-center">
                {
                    unitToText[unit]
                }
            </div>
        </div>
    )
}

