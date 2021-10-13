import { Button } from 'react-bootstrap';
import { Theme } from '../scripts/theme';
import { useLocation } from 'react-router';

// Custom login button component.
const LoginButton = () => {

    // When the user clicks the button.
    const handleClick = () => {

        // Clears localstorage.
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
            // disable button if user is already on the login page
            disabled={useLocation().pathname === '/login'}
        >
            { localStorage.getItem('user_name') ? 'Sign out' : 'Sign in' }
        </Button>
    );
}

export default LoginButton;