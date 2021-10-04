import React from 'react';
import { Link } from 'react-router-dom';
//for styling 
import styled from 'styled-components';
import Common from '../components/Common';

import CSVUploadButton from '../components/CSVUploadButton';

const LoggedIn = () => {
    return (
       
        <header> 
             <div className="Container">
            <h5>Athlete View</h5>
            <p>View your latest session here</p>
                <Container>
                    <Row>
                        <Col>
                            <CSVUploadButton/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </header>

    )
}

//use styling from common.js for links
const StyledLink = styled(Link)`
    ${Common}
`;

export default LoggedIn