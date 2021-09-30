import { Container } from "react-bootstrap";
import NameList from "../components/NameList";

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
    ]

    return (
        <Container>

            <h3>List of Athletes</h3>

            <h6>
                {list.length > 0 ? "Please choose an athlete" : "You don't have any athletes to review."}
            </h6>

            <div>
                <NameList list={list} />
            </div>

        </Container>
    );
}

export default AthleteList;