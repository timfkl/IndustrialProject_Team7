import { Container } from "react-bootstrap";
import NameList from "./NameList";

const AthleteList = ({ onNameChosen }) => {

    // Test name array. Will be replaced with database call. 
    const list = [
        {
            name: "Philip Price",
            image: "https://i.pravatar.cc/150?u=PhilipPrice",
            lastActive: "3 days ago",
        },
        {
            name: "Geoffrey Gould",
            image: "https://i.pravatar.cc/150?u=GeoffreyGould",
            lastActive: "1 day ago",
        },
        {
            name: "Caroline Pena",
            image: "https://i.pravatar.cc/150?u=CarolinePena",
            lastActive: "7 days ago",
        },
        {
            name: "Felipe Cooley",
            image: "https://i.pravatar.cc/150?u=FelipeCooley",
            lastActive: "5 days ago",
        },
        {
            name: "Queen York",
            image: "https://i.pravatar.cc/150?u=QueenYork",
            lastActive: "4 days ago",
        },
        {
            name: "Bennett Koch",
            image: "https://i.pravatar.cc/150?u=BennettKoch",
            lastActive: "less than a day ago",
        },
        {
            name: "Kristofer Villanueva",
            image: "https://i.pravatar.cc/150?u=KristoferVillanueva",
            lastActive: "less than a day ago",
        },
        {
            name: "Ivan Logan",
            image: "https://i.pravatar.cc/150?u=IvanLogan",
            lastActive: "2 days ago",
        },
        {
            name: "Antwan Watkins",
            image: "https://i.pravatar.cc/150?u=AntwanWatkins",
            lastActive: "1 day ago",
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