import React from 'react';
import { Carousel, Card, CardGroup } from "react-bootstrap";
import './Contact.css'
import { Form } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { Col } from 'react-bootstrap';

const Contact = () => {
    return (

        <div id = "content">
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image9.jpg`}  style={{ display: 'block', width: '50%', margin: 'auto'}}/>
                    <Card.Body>
                        <Card.Title><a href="https://theohealth.com/">Visit Our Website</a></Card.Title>
                        <Card.Text>
                            Learn all about what we do and who we help on our website. New features coming soon!
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image8.png`} style={{ display: 'block', width: '50%', margin: 'auto'}}/>
                    <Card.Body>
                        <Card.Title><a href="https://twitter.com/theohealth?lang=en">Follw Us On Twitter</a></Card.Title>
                        <Card.Text>
                            Keep up to date by following our Twitter account. We'll be posting updates regularly!
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image7.png`} style={{ display: 'block', width: '50%', margin: 'auto'}}/>
                    <Card.Body>
                        <Card.Title><a href="https://www.instagram.com/theo_health/">Check Out Our Instagram</a></Card.Title>
                        <Card.Text>
                            Feast your eyes on our Instagram page, where we post our greatest achievements!
                        </Card.Text>
                    </Card.Body>
                </Card>

                
            </CardGroup>
            <br/>
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/image10.jpg`} style={{ display: 'block', width: '50%', margin: 'auto'}}/>
                    <Card.Body>
                        <Card.Title>Or Give Us A Call</Card.Title>
                        <Card.Text>
                            And we'll put you in touch with expert physiotherapists who can give you the advise you need!
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title>Or Email Us A Question</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email your address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>What category does you question fall into?</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>I'd like to learn more about Theo Health</option>
                                        <option>I'd like to invest in Theo Health</option>
                                        <option>I'd like to apply for a job with Theo Health</option>
                                        <option>Other</option>
                                    </Form.Select>
                                </Form.Group>

                                <br/>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>


            </CardGroup>

        </div>


    )
}
export default Contact