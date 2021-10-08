import React from "react";
import { Carousel, Card, CardGroup } from "react-bootstrap";
import "./About.css";

const About = () => {
    return (
        <div>
            <Carousel controls={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`${process.env.PUBLIC_URL}/assets/image1.png`}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>About</h3>
                        <p>
                            Revolutionising how we train and recover from injury by allowing you to
                            measure, track and analyse your muscle development, even before progress
                            is physically visible.
                        </p>
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
                        <p>
                            Prevent injured athletes all over the world, going through unnecessary
                            turmoil and facing their battle alone.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <br />

            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image5.jpg`} />
                    <Card.Body>
                        <Card.Title>As an injured athlete</Card.Title>
                        <Card.Text>
                            This app motivates me to complete my rehabilitation exercises, and
                            visualise my progress.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image4.jpg`} />
                    <Card.Body>
                        <Card.Title>As a physiotherapist</Card.Title>
                        <Card.Text>
                            This app allows me to keep track of all my clients, and gain a greater
                            knowledge of their recovery progress.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image6.jpg`} />
                    <Card.Body>
                        <Card.Title>As an athlete</Card.Title>
                        <Card.Text>
                            This app helps me see my progress and monitor my personal improvements.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    );
};

export default About;
