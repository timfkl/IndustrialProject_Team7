import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

// Custom login button component.
const OrangeButton = ({text, props}) => {

    return (
        <Button
            {...props}
            style={{
                backgroundColor: Theme.colors.orange,
                borderColor: Theme.colors.orange,
                color: 'white'
            }}
            variant="warning"
        >
            {text}
        </Button>
    );
}

export default OrangeButton;