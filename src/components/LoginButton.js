import OrangeButton from './OrangeButton';
import { useLocation } from 'react-router';

// Custom login button component.
const LoginButton = () => {

    // When the user clicks the button.
    const handleClick = () => {

        // Clears localstorage.
        if (localStorage.getItem('user_name')) {
            localStorage.clear();
        }
    }

    return (
        <OrangeButton
            href="/login"
            onClick={handleClick}
            // disable button if user is already on the login page
            disabled={useLocation().pathname === '/login'}
            text={ localStorage.getItem('user_name') ? 'Sign out' : 'Sign in' }
        />
    );
}

export default LoginButton;