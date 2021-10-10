import { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import AthleteList from '../components/AthleteList';
import TwoDHeatmap from '../components/TwoDHeatmap'; // Contains 2D heatmap.
import CSVUploadButton from '../components/CSVUploadButton'; // Csv upload button component.
import Progress from './Progress';

const Dashboard = () => {
    const [tab, setTab] = useState(localStorage.getItem('user_type_ID') === '1' ? 1 : 2);
    const PhysioTab = <Tab eventKey={1} title="Athlete List"><AthleteList/></Tab>

    return (
        <Container className="mt-3">
            <h2>Hello, {localStorage.getItem("user_name")}</h2>
            <p>Welcome to your dashboard.</p>
            <Tabs className="mb-3" activeKey={tab} onSelect={(e) => setTab(e)}>
                
                { localStorage.getItem('user_type_ID') === '1' ? PhysioTab : null }

                <Tab eventKey={2} title="Latest Session" className="border-end">
                    {/* Container for 2D Heatmap */}
                    <TwoDHeatmap />
                    <Row>
                        <Col>
                            <CSVUploadButton />
                        </Col>
                    </Row>
                </Tab>
                
                <Tab eventKey={3} title="Progress">
                    <Progress />
                </Tab>
                {/* <Tab eventKey={3} title="Edit Goals">
                    <h3>Other Stuff to match wireframe</h3>
                </Tab> */}
            </Tabs>
        </Container>
    );
}

export default Dashboard;