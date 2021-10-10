import { Container } from "react-bootstrap";
import NameList from "./NameList";

const AthleteList = () => {

    // Test name array. Will be replaced with database call. 
    const list = [
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

    const handleItemClick = (name, index) => {
        console.log(name);
    }

    return (
        <Container className="mt-3">
            <h6>
                {list.length > 0 ? "Please choose a client from the list" : "You don't have any athletes to review."}
            </h6>
            <NameList list={list} onItmeClick={handleItemClick} />

        </Container>
    );
}

export default AthleteList;