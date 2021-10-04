import { Container, Row, Col, Button } from 'react-bootstrap';
import imgFront from '../assets/front.jpg';
import imgBack from '../assets/back.jpg';
const DataImage = ({ id, src, onLoad }) => {
    return (
        <div id={id}>
            <img src={src} alt="" width="100%" style={{ zIndex: -1 }} onLoad={onLoad} />
        </div>
    );
}
const TwoDHeatmap = () => {
    return (

        <Container>
            <Row>
                <Col sm={6}>
                    <DataImage id={"imageFront"} src={imgFront} onLoad={() => { onDataImageLoad(true) }} />
                </Col>
                <Col sm={6}>
                    <DataImage id={"imageBack"} src={imgBack} onLoad={() => { onDataImageLoad(false) }} />
                </Col>
            </Row>
        </Container>

    );
}

export default TwoDHeatmap;