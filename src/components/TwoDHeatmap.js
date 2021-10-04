import { Container, Row, Col, Button } from 'react-bootstrap';
import imgFront from '../assets/front.jpg';
import imgBack from '../assets/back.jpg';
import h337 from 'heatmap.js';

const DataImage = ({ id, src, onLoad }) => {
    return (
        <div id={id}>
            <img src={src} alt="" width="100%" style={{ zIndex: -1 }} onLoad={onLoad} />
        </div>
    );
}

const TwoDHeatmap = () => {
    let heatmapQuadLeft, heatmapQuadRight, heatmapHamsLeft, heatmapHamsRight;

    const onDataImageLoad = (isFront) => {
        
        if (isFront) {
            heatmapQuadLeft = createHeatmapInstance('imageFront');
            heatmapQuadRight = createHeatmapInstance('imageFront');
        } else {
            heatmapHamsLeft = createHeatmapInstance('imageBack');
            heatmapHamsRight = createHeatmapInstance('imageBack');
        }
    }

    const createHeatmapInstance = (container) => {
                
        return h337.create({
            // only container is required, the rest will be defaults
            container: document.getElementById(container),
            blur: 0,
            radius: 20,
            minOpacity: 0.7,
            gradient: {
                '0': 'green',
                '0.2': '#EDD74B',
                '0.4': '#F2B62E',
                '0.6': '#DB8535',
                '0.8': '#F25B2E',
                '0.95': '#E82C3D'
            }
        });
    }

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