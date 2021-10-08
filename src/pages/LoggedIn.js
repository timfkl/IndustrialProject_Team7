import { Link } from 'react-router-dom';
//for styling 
import styled from 'styled-components';
import Common from '../components/Common';
import { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import TwoDHeatmap from '../components/TwoDHeatmap'; // Contains 2D heatmap.
import CSVUploadButton from '../components/CSVUploadButton'; // Csv upload button component.
import Progress from './Progress';

const LoggedIn = () => {
    const [tab, setTab] = useState(1);

    return (
        <Container className="mt-3">
            <h2>Hello, {localStorage.getItem('user_name')}</h2>
            <p>Welcome to your dashboard (Athlete View).</p>
            <Tabs className="mb-3" activeKey={tab} onSelect={(e) => setTab(e)}>
                <Tab eventKey={1} title="Latest Session">
                    {/* Container for 2D Heatmap */}
                    <TwoDHeatmap />
                    <Row>
                        <Col>
                            <CSVUploadButton />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey={2} title="Progress">
                    <Progress/>
                </Tab>
                <Tab eventKey={3} title="Edit Goals">
                    <h3>Other Stuff to match wireframe</h3>
                </Tab>
            </Tabs>
        </Container>
    );
}

//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
`;

export default LoggedIn