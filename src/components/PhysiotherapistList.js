import { ListGroup } from "react-bootstrap";

function PhysiotherapistList() {
  const nameList = [
    "Moshe Chapman",
    "Dustin Evans",
    "Jasper Levine",
    "Octavio Powell",
    "Silas Henry",
    "Brennen Boyle",
    "Krish Booth",
    "Frederick Brown",
    "Koen Massey",
    "Ronan Dixon",
    "Araceli Gibbs",
    "Aldi Lidl",
  ];

  return (

    <ListGroup>
      {nameList.map((name, index) => {
        return (
          <ListGroup.Item action key={index} href={index}>
            {name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default PhysiotherapistList;
