import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

// Custom login button component.
const LoginButton = () => {
    return (
        <Button
            href="/login"
            variant="warning"
            style={{
                backgroundColor: Theme.colors.orange,
                borderColor: Theme.colors.orange,
                color: 'white'
            }}
        >
            Sign in
        </Button>
    );
}

export default LoginButton;