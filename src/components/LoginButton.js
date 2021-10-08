import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';

// Custom login button component.
const LoginButton = () => {

    const handleClick = () => {
        
        if (localStorage.getItem('user_name')) {
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_type_ID');
            // localStorage.clear()
        }
    }

    return (
        <Button
            href="/login"
            variant="warning"
            onClick={handleClick}
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