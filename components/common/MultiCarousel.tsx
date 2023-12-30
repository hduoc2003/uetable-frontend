import Carousel, { ArrowProps, ButtonGroupProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React, { ReactNode } from 'react'
import Preview from "./Preview/Preview";
import SlideBackIcon from "./(Icons)/SlideBackIcon";
import SlideNextIcon from "./(Icons)/SlideNextIcon";
import { FaArrowLeft, FaArrowLeftLong, FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import MyButtonWrapper from "./(MyButton)/MyButtonWrapper";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktopfasdjk: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};

interface Props {
    children?: ReactNode
    width: number | string;
    gap?: number;
}


export default function MultiCarousel({
    children, width, gap = 16
}: Props) {
    return (
        <div style={{width: width ?? 0, marginLeft: -gap/2}}>
            <Carousel
                arrows={false}
                responsive={responsive}
                // customRightArrow={<CustomRightArrow/>}
                // customLeftArrow={<CustomLeftArrow/>}
                customButtonGroup={<CustomButtonGroup/>}
            >
                {
                    React.Children.map(children, (child) => {
                        return (
                            <div className="mb-10" style={{marginRight: gap/2, marginLeft: gap/2}}>
                                {child}
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

function CustomRightArrow({onClick}: {onClick: () => void}) {
    return (
        <MyButtonWrapper onClick={onClick} rounded className='border-transparent border-2 p-2 absolute top-full -translate-y-full translate-x-[120%] right-1/2'>
            <FaArrowRightLong className='fill-royal-gray '/>
        </MyButtonWrapper>
    )
}

function CustomLeftArrow({onClick}: {onClick: () => void}) {
    return (
        <MyButtonWrapper onClick={() => onClick?.()} rounded className='border-transparent border-2 p-2 absolute top-full -translate-y-full -translate-x-[120%] left-1/2'>
            <FaArrowLeftLong className='fill-royal-gray'/>
        </MyButtonWrapper>
    )
}

const CustomButtonGroup = ({ next, previous }: ButtonGroupProps) => {
    return (
      <>
        <CustomRightArrow onClick={() => next?.()} />
        <CustomLeftArrow onClick={() => previous?.()}/>
      </>
    );
  };
