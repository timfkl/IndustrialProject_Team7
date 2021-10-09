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
    ]

    return (
        <Container className="mt-3">

            <h2>Hello, {localStorage.getItem('user_name')}.</h2>
            <p>Here is a list of your clients.</p>

            <h6>
                {list.length > 0 ? "" : "You don't have any athletes to review."}
            </h6>

            <div>
                <NameList list={list} />
            </div>

        </Container>
    );
}

export default AthleteList;