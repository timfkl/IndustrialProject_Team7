import { Container } from "react-bootstrap";
import NameList from "../components/NameList";

const AthleteList = () => {

  const list = [
    "test"
  ]

  return (
    <Container>

    <NameList list={list} />
    </Container>
  );
}

export default AthleteList;