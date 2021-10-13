import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';
import { useState } from 'react';

// Custom login button component.
const OrangeButton = (props) => {
    const [backColor, setBackColor] = useState(Theme.colors.orange);

    const handleMouseEnter = e => {
        setBackColor(Theme.mouseOver.orange);
        if (props.onMouseEnter) props.onMouseEnter(e);
    }

    const handleMouseLeave = e => {
        setBackColor(Theme.colors.orange);
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
            variant="warning"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.text}
        </Button>
    );
}

export default OrangeButton;