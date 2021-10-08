import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

// Custom login button component.
const TealButton = ({text, props}) => {

    return (
        <Button
            {...props}
            style={{
                backgroundColor: Theme.colors.teal,
                borderColor: Theme.colors.teal,
                color: 'white'
            }}
        >
            {text}
        </Button>
    );
}

export default TealButton;