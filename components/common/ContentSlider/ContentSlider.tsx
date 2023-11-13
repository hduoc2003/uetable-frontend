'use client';

import { Carousel, Space } from "antd";
import SlideBackIcon from "../(Icons)/SlideBackIcon";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import SlideNextIcon from "../(Icons)/SlideNextIcon";
import MyButtonWrapper from "../(MyButton)/MyButtonWrapper";
import { CarouselRef } from "antd/es/carousel";
import { twMerge } from "tailwind-merge";
import './slick.css';

interface ContentSliderProps {
    iconSize?: string | number
    width?: number
    contents: React.ReactNode[]
}

export default function ContentSlider({
    iconSize,
    width,
    contents
}: ContentSliderProps) {
    const [pressLeft, setPressLeft] = useState(false);
    const [pressRight, setPressRight] = useState(false);
    const handleSlideNext = useCallback(() => {
        ref.current?.next()
        setPressRight(true);
    }, [])
    const handleSlideBack = useCallback(() => {
        ref.current?.prev()
        setPressLeft(true);
    }, [])
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    handleSlideBack();
                    break;
                case 'ArrowRight':
                    handleSlideNext();
                    break;
            }
        }
        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    setTimeout(() => setPressLeft(false), 1000)
                    break;
                case 'ArrowRight':
                    setTimeout(() => setPressRight(false), 1000)
                    break;
            }
        }
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleSlideBack, handleSlideNext])

    const ref = useRef<CarouselRef>(null);
    return (
        <div>
            <Carousel
                dots
                className="h-fit pb-6 rounded-md relative"
                style={{width: width ?? 1100}}
                ref={ref} arrows={true}
                prevArrow={
                    <SlideButton
                        handleSlide={handleSlideBack}
                        press={pressLeft}
                        iconSize={iconSize}
                        Icon={SlideBackIcon}
                    />
                }
                nextArrow={
                    <SlideButton
                        handleSlide={handleSlideNext}
                        press={pressRight}

                        iconSize={iconSize}
                        Icon={SlideNextIcon}
                    />
                }
            >
                {contents.map((child, i) => (
                    <div key={i} className="!flex justify-center">
                        {child}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

function SlideButton({
    handleSlide,
    press,
    iconSize,
    Icon,
    style,
    ref,
    className
} : {
    handleSlide: () => void,
    press: boolean,
    iconSize?: number | string
    className?: string
    style?: React.CSSProperties
    ref?:React.RefObject<HTMLButtonElement>
    Icon: typeof SlideBackIcon
}) {
    return (
        <MyButtonWrapper
            onClick={handleSlide}
            className={twMerge(`!rounded-full !h-fit !w-fit
                                !p-3 !flex
                                !place-content-center
                              `, className)}
            // style={!press ? {backgroundColor: 'blue !important'} : undefined}
            ref={ref}
        >
            <Icon size={iconSize ?? 28} />
        </MyButtonWrapper>
    )
}
