import React, { useState, useEffect } from "react";
import {
  Container,
  Image,
  Stack,
  Table,
  Row,
  Alert,
  Button,
} from "react-bootstrap";
import { EmployeeProfile } from "../Interfaces/Interfaces";
import "../scss/profile.scss";
import RequestForm from "./RequestForm";
import RequestHistory from "./RequestHistory";

export default function Profile() {
  /*=============================
    State
   ==============================*/
  const [profile, setProfile] = useState<EmployeeProfile>(
    {} as EmployeeProfile
  );
  const [desktopView, setDesktopView] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );
  const [showForm, toggleShowForm] = useState(true);

  /*=============================
    Functions
   ==============================*/
  useEffect(() => {
    let requestDone = false;
    if (Object.keys(profile).length === 0 && !requestDone) {
      fetch("/Api/getProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //   The employee's ID is to be fetched from the sessionStorage or a cookie created after login
          id: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => setProfile(data));

      requestDone = true;
    }
    return () => {
      requestDone = true;
    };
  }, [profile]);

  useEffect(() => {
    // Listen to the screen size
    window.addEventListener("resize", () =>
      setDesktopView(window.matchMedia("(min-width: 992px)").matches)
    );

    return () => {
      window.removeEventListener("resize", () =>
        setDesktopView(window.matchMedia("(min-width: 992px)").matches)
      );
    };
  }, [desktopView]);

  /*===============
   DOM
   ================*/
  return (
    <React.Fragment>
      {Object.keys(profile).length > 0 && (
        <Container className="h-100">
          <Row className="mx-0 h-100">
            {/*==========
             Profile Pane
             ============= */}

            <div
              id="employee-profile"
              className={`p-3 text-center ${
                desktopView
                  ? "h-100 flex-column align-items-center col-3"
                  : "col-12"
              }`}
            >
              <Stack
                gap={2}
                direction={!desktopView ? "horizontal" : "vertical"}
                className="justify-content-between"
              >
                <div>
                  <Image
                    src={`images/${profile.image}`}
                    alt={`${profile.name}`}
                    roundedCircle
                    width="200px"
                    height="200px"
                    className="p-1"
                  />
                </div>

                <div className="w-100">
                  <h1>{profile.name}</h1>
                  <h3>{profile.jobTitle}</h3>
                  <small>ID : {profile.id}</small>

                  <Table
                    borderless
                    className={`align-middle ${desktopView && "my-4"}`}
                  >
                    <tbody>
                      <tr>
                        <th>Total Credit</th>
                        <td>:</td>
                        <td>{profile.totalCredit}</td>
                      </tr>
                      <tr>
                        <th>Used Credit</th>
                        <td>:</td>
                        <td>{profile.usedCredit}</td>
                      </tr>
                      <tr>
                        <th>Available Credit</th>
                        <td>:</td>
                        <td>{profile.totalCredit - profile.usedCredit}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Stack>
            </div>

            <div
              className={`fw-bold ${
                desktopView ? (showForm ? "col-5" : "col-6") : "col"
              }`}
            >
              {showForm ? (
                profile.totalCredit > profile.usedCredit ? (
                  <RequestForm profile={profile} setProfile={setProfile} />
                ) : (
                  <Alert
                    variant="dark"
                    className={`text-center ${desktopView && "my-5"}`}
                  >
                    You cannot create a vacation request as you already used all
                    your available credit
                  </Alert>
                )
              ) : (
                <RequestHistory />
              )}
              {/*=================
                 Switch Form/History
                  ================== */}
              <Button
                variant="danger"
                id="btn-switch"
                className="my-5"
                onClick={() => toggleShowForm(!showForm)}
              >
                {showForm
                  ? "Show the history of requests"
                  : "Request a vacation"}
              </Button>
            </div>
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
}
