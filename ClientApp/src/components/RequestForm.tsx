import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { EmployeeProfile } from "../Interfaces/Interfaces";
import "../scss/request-form.scss";

export default function RequestVacation({
  profile,
  setProfile,
}: {
  profile: EmployeeProfile;
  setProfile: React.Dispatch<React.SetStateAction<EmployeeProfile>>;
}) {
  /*==========
    State
  ===========*/
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateValidation, setStartDateValidation] = useState("");
  const [endDateValidation, setEndDateValidation] = useState("");
  const [vacationType, setVacationType] = useState("annualVacation");
  const [reason, setReason] = useState("");

  const [holidays, setHolidays] = useState([""]);

  /*==========
    Functions
  ===========*/
  useEffect(() => {
    let requestDone = false;
    if (holidays.length === 1 && !requestDone) {
      fetch("/Api/getHolidays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setHolidays(data));

      requestDone = true;
    }
    return () => {
      requestDone = true;
    };
  }, [holidays]);

  function validateStartDate(date: string) {
    setStartDate(date);
    validateEndDate(endDate, date);
    if (new Date(date) <= new Date())
      setStartDateValidation("Kindly select a date that does follows today");
    else if (holidays.includes(date.substring(5, 10)))
      setStartDateValidation(
        "This day cannot be selected being an official vacation"
      );
    else {
      setStartDateValidation("");
    }
  }

  function validateEndDate(endDate: string, startDate: string) {
    setEndDate(endDate);
    if (endDate === "") return;

    if (startDate === "")
      setEndDateValidation("Kindly select the vacation start date first");
    else if (new Date(endDate) < new Date(startDate))
      setEndDateValidation(
        "Kindly select a date that does not preceed the vacation start date"
      );
    else if (holidays.includes(endDate.substring(5, 10)))
      setStartDateValidation(
        "This day cannot be selected being an official vacation"
      );
    else {
      setEndDateValidation("");
    }
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (startDateValidation === "" && endDateValidation === "")
      fetch("/Api/postVacationRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //   The employee's ID is to be fetched from the sessionStorage or a cookie created after login
          employeeId: 1,
          from: startDate,
          to: endDate,
          vacationType: vacationType,
          reason: reason,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile({ ...profile, usedCredit: data.daysUsed });
          document.querySelector("form")!.reset();
          setStartDate("");
          setEndDate("");

          if (data.uncountedDays > 0)
            alert(`Request submitted successfully !
          N.B. Some days were already taken before or are country official vacations
          They will not be deducted again from your credit`);
          else alert("Request submitted successfully");
        });
    else alert("kindly fix the below issues first");
  }

  /*====
    DOM
  ======*/
  return (
    <div id="request-form">
      <h1 className="text-center my-4">Request a Vacation</h1>
      <Form onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3" controlId="vacationType">
          <Form.Label>Vacation Type</Form.Label>
          <select
            className="form-select"
            aria-label="Vacation Type"
            onChange={(e) => setVacationType(e.target.value)}
          >
            <option
              value="annualVacation"
              selected={vacationType === "annualVacation"}
            >
              Annual Vacation
            </option>
            <option
              value="suddenVacation"
              selected={vacationType === "suddenVacation"}
            >
              Sudden Vacation
            </option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="vacationStartDate">
          <Form.Label className="fw-bold">Vacation Start Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => validateStartDate(e.target.value)}
          />
          <Form.Text>{startDateValidation}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="vacationEndDate">
          <Form.Label className="fw-bold">Vacation End Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => validateEndDate(e.target.value, startDate)}
          />
          <Form.Text>{endDateValidation}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reason">
          <Form.Label className="fw-bold">Reason</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mention your reason"
            required
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
