import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

// Custom login button component.
const TealButton = (props) => {
    const [backColor, setBackColor] = useState(Theme.colors.teal);

    const handleMouseEnter = e => {
        setBackColor(Theme.mouseOver.teal);
        if (props.onMouseEnter) props.onMouseEnter(e);
    }

    const handleMouseLeave = e => {
        setBackColor(Theme.colors.teal);
        if (props.onMouseLeave) props.onMouseLeave(e);
    }

    return (
        <Button
            {...props}
            style={{
                backgroundColor: backColor,
                borderColor: backColor,
                color: 'white'
            }}
            variant="info"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.text}
        </Button>
    );
}

export default TealButton;