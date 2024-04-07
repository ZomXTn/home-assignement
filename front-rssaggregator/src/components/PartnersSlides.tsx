import React from 'react';
import Slider from 'react-slick';
import { Box, Paper } from '@mui/material';

const Carousel: React.FC<{ data: any[] }> = ({ data }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {data.map((item, index) => (
                <Box key={index} width={100} height={100} padding={1}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%" }} />
                </Box>
            ))}
        </Slider>
    );
};

export default Carousel;