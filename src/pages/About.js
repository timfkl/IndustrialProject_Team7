import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const About = () => {
    return (
        
            <Carousel controls={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${process.env.PUBLIC_URL}/assets/image1.png`} 
                        alt="First slide"
                    />
                <Carousel.Caption>
                    <h3>About</h3>
                    <p>Revolutionising how we train and recover from injury by allowing you to measure, 
                    track and analyse your muscle development, even before progress is physically visible.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`${process.env.PUBLIC_URL}/assets/image3.png`} 
                    alt="Second slide"
                />
            
                <Carousel.Caption>
                    <h3>ACL - Anterior Cruciate Ligament</h3>
                    <ul>
                        <p>1 of 4 ligaments that connect your knee bones</p>
                        <p>Most common sports injury globally</p>
                    </ul>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={`${process.env.PUBLIC_URL}/assets/image2.png`} 
                    alt="Third slide"
                />
            
                <Carousel.Caption>
                    <h3>Our Vision</h3>
                    <p>Prevent injured athletes all over the world, going through unnecessary turmoil and facing their battle alone.</p>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    )
}

export default About