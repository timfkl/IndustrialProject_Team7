import TealButton from "./TealButton";

const DashboardButton = () => {
    return localStorage.getItem("user_name") ? (
        <TealButton text="Dashboard" props={{ className: "me-1", href: "/dashboard" }} />
    ) : null;
};

export default DashboardButton;
