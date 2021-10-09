import TealButton from "./TealButton";

const DashboardButton = () => {

    const handleClick = () => {
        if (localStorage.getItem('user_type_ID') === '1') window.location.href = "/list";
        else window.location.href = "/dashboard";
    }

    return localStorage.getItem("user_name") ? (
        <TealButton text="Dashboard" className="me-1" onClick={handleClick} />
    ) : null;
};

export default DashboardButton;
