import { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import AthleteList from '../components/AthleteList';
import TwoDHeatmap from '../components/TwoDHeatmap'; // Contains 2D heatmap.
import CSVUploadButton from '../components/CSVUploadButton'; // Csv upload button component.
import Progress from './Progress';

const AthleteDashboard = () => {
    const [tab, setTab] = useState(1);

    return (
        <Container className="mt-3">
            <h2>Hello, {localStorage.getItem("user_name")}.</h2>
            <p>Welcome to your dashboard.</p>
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
                    <Progress />
                </Tab>
                {/* <Tab eventKey={3} title="Edit Goals">
                    <h3>Other Stuff to match wireframe</h3>
                </Tab> */}
            </Tabs>
        </Container>
    );
}

const PhysioDashboard = () => {
    const [tab, setTab] = useState(1);
    const [client, setClient] = useState("Athlete");

    const handleNameChosen = (name, index) => {
        setClient(name);
        setTab(2);
    }

    return (
        <Container className="mt-3">
            <h2>Hello, {localStorage.getItem("user_name")}</h2>
            <p>Welcome to your dashboard.</p>
            <Tabs className="mb-3" activeKey={tab} onSelect={(e) => setTab(e)}>
                
                <Tab eventKey={1} title="Athlete List">
                    <AthleteList onNameChosen={handleNameChosen}/>
                </Tab>

                <Tab eventKey={2} title={`${client}'s Session`} disabled={client === "Athlete"}>                 
                    {/* Container for 2D Heatmap */}
                    <TwoDHeatmap />
                    <Row>
                        <Col>
                            <CSVUploadButton />
                        </Col>
                    </Row>
                </Tab>
                
                <Tab eventKey={3} title={`${client}'s Progress`} disabled={client === "Athlete"}>
                    <Progress />
                </Tab>
                {/* <Tab eventKey={3} title="Edit Goals">
                    <h3>Other Stuff to match wireframe</h3>
                </Tab> */}
            </Tabs>
        </Container>
    );
}

const Dashboard = () => {

    if (localStorage.getItem('user_type_ID') === '1') return <PhysioDashboard/>
    else return <AthleteDashboard/>

}

export default Dashboard;