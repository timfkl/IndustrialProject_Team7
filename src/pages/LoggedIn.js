import { Link } from 'react-router-dom';
//for styling 
import styled from 'styled-components';
import Common from '../components/Common';

import { Container, Row, Col } from 'react-bootstrap';
import TwoDHeatmap from '../components/TwoDHeatmap'; // Contains 2D heatmap.
import CSVUploadButton from '../components/CSVUploadButton'; // Csv upload button component.

const LoggedIn = () => {

    return (
        <header> 
            <div className="Container">
                <h5>Athlete View</h5>
                <p>View your latest session here</p>
                
                <Container>
                    {/* Container for 2D Heatmap */}
                    <TwoDHeatmap />
                    <Row>
                        <Col>
                            <CSVUploadButton/>
                        </Col>
                    </Row>
                </Container>

                <p> stats on the session </p>
                <StyledLink className="LinkContain" to="/progress"> Progress </StyledLink> 
            </div>
        </header>

    )
}

//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
`;

export default LoggedIn