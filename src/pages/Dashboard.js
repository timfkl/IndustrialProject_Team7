import { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import AthleteList from '../components/AthleteList';
import TwoDHeatmap from '../components/TwoDHeatmap'; // Contains 2D heatmap.
import Progress from './Progress';

// This dashnoard is only for the athlete.
const AthleteDashboard = () => {
    const [tab, setTab] = useState(1); // Stores which tab the athlete is in.

    // Displays the dashboard where part is split into tabs.
    return (
        <Container className="mt-3">
            <h2>Hello, {localStorage.getItem("user_name")}.</h2>
            <p>Welcome to your dashboard.</p>
            <Tabs className="mb-3" activeKey={tab} onSelect={(e) => setTab(e)}>
                <Tab eventKey={1} title="Latest Session">
                    {/* Container for 2D Heatmap */}
                    <TwoDHeatmap />
                </Tab>
                
                <Tab eventKey={2} title="Progress">
                    <Progress />
                </Tab>
            </Tabs>
        </Container>
    );
}

// This dashboard only displays for the physiotherapist.
const PhysioDashboard = () => {
    const [tab, setTab] = useState(1); // Stores which tab the physio is in.
    // If page is reloaded, the physio can still view the same athlete.
    const [client, setClient] = useState(sessionStorage.getItem('athlete') ? sessionStorage.getItem('athlete') : "Athlete");

    const handleNameChosen = (item) => {
        sessionStorage.setItem('athlete', item.name); // Saves to localstorage incase of reload.
        setClient(item.name);
        setTab(2); // Changes to heatmap.
    }

    // Displays the dashboard where part is split into tabs.
    return (
        <Container className="mt-3">
            <h2>Hello, {localStorage.getItem("user_name")}.</h2>
            <p>Welcome to your dashboard.</p>
            <Tabs className="mb-3" activeKey={tab} onSelect={(e) => setTab(e)}>
                
                <Tab eventKey={1} title="Athlete List">
                    <AthleteList onNameChosen={handleNameChosen}/>
                </Tab>

                <Tab eventKey={2} title={`${client}'s Session`} disabled={client === "Athlete"}>                 
                    {/* Container for 2D Heatmap */}
                    <TwoDHeatmap />
                </Tab>
                
                <Tab eventKey={3} title={`${client}'s Progress`} disabled={client === "Athlete"}>
                    <Progress />
                </Tab>
            </Tabs>
        </Container>
    );
}

const Dashboard = () => {

    if (localStorage.getItem('user_type_ID') === '1') return <PhysioDashboard/>
    else return <AthleteDashboard/>

}

export default Dashboard;