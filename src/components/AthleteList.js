import { Container } from "react-bootstrap";
import NameList from "./NameList";

const AthleteList = ({ onNameChosen }) => {

    // Test name array. Will be replaced with database call. 
    const list = [
        "Philip Price",
        "Geoffrey Gould",
        "Caroline Pena",
        "Felipe Cooley",
        "Queen York",
        "Bennett Koch",
        "Kristofer Villanueva",
        "Ivan Logan",
        "Antwan Watkins",
        "Dong Conner",
        "Aldi Lidl"
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