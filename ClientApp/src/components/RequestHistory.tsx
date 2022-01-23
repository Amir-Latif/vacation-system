import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Table, Stack } from "react-bootstrap";
import { EmployeeHistory } from "../Interfaces/Interfaces";
import "../scss/request-history.scss";

export default function RequestHistory() {
  /*==========
    State
  ===========*/
  const [history, setHistory] = useState([] as EmployeeHistory[]);
  const [filteredHistory, setFilteredHistory] = useState(history);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validationText, setValidationText] = useState("");

  /*==========
    Functions
    ===========*/
  useEffect(() => {
    let requestDone = false;

    if (history.length === 0)
      fetch("/Api/getHistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //   The employee's ID is to be fetched from the sessionStorage or a cookie created after login
          id: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setHistory(data);
          setFilteredHistory(data);
        });

    requestDone = true;

    return () => {
      requestDone = true;
    };
  }, [history]);

  //   ---------------------------
  function filter(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (startDate && endDate)
      if (new Date(endDate) < new Date(startDate))
        setValidationText(
          "Vacation end date cannot preceede vacation start date"
        );
      else {
        setValidationText("");
        let newHistory = history.filter(
          (element) => element.from >= startDate && element.to <= endDate
        );
        newHistory.length > 0
          ? setFilteredHistory(newHistory)
          : setFilteredHistory(history);
      }
    else if (startDate) {
      let newHistory = history.filter((element) => element.from >= startDate);
      newHistory.length > 0
        ? setFilteredHistory(newHistory)
        : setFilteredHistory(history);
    } else if (endDate) {
      let newHistory = history.filter((element) => element.from <= endDate);
      newHistory.length > 0
        ? setFilteredHistory(newHistory)
        : setFilteredHistory(history);
    }
  }

  /*==========
    DOM
    ===========*/
  return (
    <React.Fragment>
      {filteredHistory.length > 0 ? (
        <div id="request-history">
          <div>
            <Form className="my-3">
              <Stack direction="horizontal" className="align-items-center">
                <label className="me-3">From</label>
                <Form.Control
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label className="mx-3">To</label>
                <Form.Control
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Stack>
              <div className="my-3">
                <Form.Text>{validationText}</Form.Text>
              </div>
              <Stack direction="horizontal">
                <Button variant="danger" onClick={(e) => filter(e)}>
                  Apply Filter
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setFilteredHistory(history)}
                >
                  Display all records
                </Button>
              </Stack>
            </Form>
          </div>

          <Table
            variant="secondary"
            striped
            bordered
            hover
            className="my-5 text-center"
          >
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th className="reason">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((element) => (
                <tr key={element.id}>
                  <td>{new Date(element.from).toLocaleDateString()}</td>
                  <td>{new Date(element.to).toLocaleDateString()}</td>
                  <td className="type">
                    {element.vacationType === "annualVacation"
                      ? "Annual"
                      : "Sudden"}
                  </td>
                  <td className="reason">{element.reason}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="dark" className="text-center my-3">
          You did not request any vacations yet
        </Alert>
      )}
    </React.Fragment>
  );
}
