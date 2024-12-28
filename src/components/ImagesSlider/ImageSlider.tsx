import { useEffect, useRef, useState } from "react";
import PrevIcon from "@Assets/icons/prev-btn.svg";
import NextIcon from "@Assets/icons/next-btn.svg";

import "./ImageSlider.scss";

interface ImageSliderProps {
    className: string;
    images: { id: number; img: string }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ className, images }) => {
    const [selectedImageId, setSelectedImageId] = useState(1);
    const container = useRef<HTMLDivElement>(null);

    const prevImageClickHandler = () => {
        if (selectedImageId === images[0]?.id) {
            return;
        }
        setSelectedImageId((prev) => prev - 1);
    };

    const nextImageClickHandler = () => {
        if (selectedImageId === images[images.length - 1]?.id) {
            return;
        }
        setSelectedImageId((next) => next + 1);
    };

    useEffect(() => {
        return () => {
            setSelectedImageId(1);
        };
    }, [images]);

    function scroll(change: number, duration: number) {
        const start = container.current?.scrollLeft ?? 0;
        let currentTime = 0;
        const increment = 20;

        const animateScroll = () => {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            if (container.current) {
                container.current.scrollLeft = val;
            }
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    const easeInOutQuad = (
        currentTime: number,
        start: number,
        change: number,
        duration: number
    ) => {
        currentTime /= duration / 2;
        if (currentTime < 1) return (change / 2) * currentTime * currentTime + start;
        currentTime--;
        return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
    };
    return (
        <div className={`container ${className}`}>
            {images?.map((el) => (
                <div
                    className={`${
                        el.id === selectedImageId ? "" : "mySlides"
                    } rounded h-[400px] border`}
                    key={el.id}
                >
                    <div className="flex h-full items-center justify-center">
                        <div>
                            <img
                                src={el.img}
                                style={{ width: "100%", maxHeight: "400px" }}
                                className="rounded"
                                alt={`Slide ${el.id}`}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {selectedImageId !== images[0]?.id && (
                <a className="prev cursor-default">
                    <PrevIcon onClick={prevImageClickHandler} className="cursor-pointer" />
                </a>
            )}

            {selectedImageId !== images[images.length - 1]?.id && (
                <a className="next cursor-default">
                    <NextIcon onClick={nextImageClickHandler} className="cursor-pointer" />
                </a>
            )}

            <div className="flex mt-5 overflow-x-hidden" ref={container}>
                {images.map((el) => (
                    <div
                        className="w-[100px] h-[80px] mr-5 shrink-0 mb-3 border cursor-pointer"
                        key={el.id}
                    >
                        <div className="flex h-full items-center justify-center">
                            <div>
                                <img
                                    className={`demo cursor${
                                        el.id === selectedImageId ? " active" : ""
                                    }`}
                                    src={el.img}
                                    style={{ width: "100%", maxHeight: "80px" }}
                                    onClick={() => setSelectedImageId(el.id)}
                                    alt={`Thumbnail ${el.id}`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <a className="prev cursor-default prev-bottom">
                <PrevIcon onClick={() => scroll(-100, 500)} className="cursor-pointer" />
            </a>

            <a className="next cursor-default next-bottom">
                <NextIcon onClick={() => scroll(100, 500)} className="cursor-pointer" />
            </a> */}
        </div>
    );
};

export default ImageSlider;
