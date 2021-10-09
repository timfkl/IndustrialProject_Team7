import TealButton from "./TealButton";

const DashboardButton = () => {

    return localStorage.getItem("user_name") ? (
        <TealButton text="Dashboard" href="/dashboard" className="me-1" />
    ) : null;
};

export default DashboardButton;
