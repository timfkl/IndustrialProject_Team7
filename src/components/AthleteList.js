import { Container } from "react-bootstrap";
import NameList from "./NameList";

const AthleteList = ({ onNameChosen }) => {

    // Test name array. Will be replaced with database call. 
    const list = [
        {
            name: "Philip Price",
            image: "https://i.pravatar.cc/150?u=PhilipPrice",
            lastActive: "09/10/21 @ 13:21",
            height: "",
            weight: "",
            dob: "",
            email: "djupedal@sbcglobal.net",
            mobile: "+44 7700 900496"
        },
        {
            name: "Geoffrey Gould",
            image: "https://i.pravatar.cc/150?u=GeoffreyGould",
            lastActive: "09/10/21 @ 15:23",
            height: "",
            weight: "",
            dob: "",
            email: "dmouse@mac.com",
            mobile: "+44 7700 900789"
        },
        {
            name: "Caroline Pena",
            image: "https://i.pravatar.cc/150?u=CarolinePena",
            lastActive: "07/10/21 @ 13:12",
            height: "",
            weight: "",
            dob: "",
            email: "grdschl@icloud.com",
            mobile: "+44 7700 900550"
        },
        {
            name: "Felipe Cooley",
            image: "https://i.pravatar.cc/150?u=FelipeCooley",
            lastActive: "05/10/21 @ 10:30",
            height: "",
            weight: "",
            dob: "",
            email: "kramulous@hotmail.com",
            mobile: "+44 7700 900377"
        },
        {
            name: "Queen York",
            image: "https://i.pravatar.cc/150?u=QueenYork",
            lastActive: "10/10/21 @ 12:31",
            height: "",
            weight: "",
            dob: "",
            email: "bockelboy@yahoo.com",
            mobile: "+44 7700 900956"
        },
        {
            name: "Bennett Koch",
            image: "https://i.pravatar.cc/150?u=BennettKoch",
            lastActive: "10/10/21 @ 15:23",
            height: "",
            weight: "",
            dob: "",
            email: "grolschie@mac.com",
            mobile: "+44 7700 900045"
        },
        {
            name: "Kristofer Villanueva",
            image: "https://i.pravatar.cc/150?u=KristoferVillanueva",
            lastActive: "07/10/21 @ 14:24",
            height: "",
            weight: "",
            dob: "",
            email: "harryh@verizon.net",
            mobile: "+44 7700 900119"
        },
        {
            name: "Ivan Logan",
            image: "https://i.pravatar.cc/150?u=IvanLogan",
            lastActive: "30/19/21 @ 12:45",
            height: "",
            weight: "",
            dob: "",
            email: "ewaters@outlook.com",
            mobile: "+44 7700 900643"
        },
        {
            name: "Antwan Watkins",
            image: "https://i.pravatar.cc/150?u=AntwanWatkins",
            lastActive: "03/10/21 @ 16:40",
            height: "",
            weight: "",
            dob: "",
            email: "epeeist@sbcglobal.net",
            mobile: "+44 7700 900680"
        }
    ];

    return (
        <Container className="mt-3">
            <h6>
                {list.length > 0 ? "Please choose an athlete from the list." : "You don't have any athletes to review."}
            </h6>
            <NameList list={list} onItemClick={onNameChosen} />

        </Container>
    );
}

export default AthleteList;