import React, { useEffect, useState } from "react";
import ImagingStep from "./ImagingStep";

const Computer = (props) => {
  const [computer, setComputer] = useState([]);
  const [ou, setOu] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStepChange = (propertyName, newValue) => {
    setComputer((prevComputer) => ({
      ...prevComputer,
      [propertyName]: newValue,
    }));
  };

  const checkOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/checkinout/${computer.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ way: "out" }),
        }
      );
      props.rerender();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/computers/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        setComputer(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/ou/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setOu(data);
        } else {
          setOu("Not Found");
        }
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/issues/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentIssue(data[data.length - 1]);
        setIssues(data);
      });
  }, []);

  const markImaged = () => {
    fetch(`http://localhost:3001/api/imaged/${props.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        props.rerender();
      });
    setImaged(true);
  };

  return (
    <>
      <div className=" w-full text-left select-none">
        <div
          className="grid grid-cols-3 text-center hover:bg-gray-600 border rounded-md py-1 px-1 ease-in-out duration-300"
          onClick={() => setExpanded(!expanded)}
        >
          <div>{computer.name}</div>
          <div>{computer.serviceTag}</div>
          <div>{computer.model}</div>
        </div>
        {expanded && (
          <div className="border rounded-md py-1 px-1">
            <div className="grid grid-cols-2 div px-3 py-4">
              <div>
                <div className="">
                  Last Imaged:{" "}
                  {computer?.imagedOn ? computer.imagedOn : "Never"}
                </div>
                <div className="">Warranty Expiration: {computer.warranty}</div>
                <div className="">OU: {ou}</div>
                {!props.imaged && (
                  <>
                    <br></br>
                    <ImagingStep
                      name={computer.name}
                      step="wiped"
                      property="isWiped"
                      label="PC Wiped"
                      checked={computer.isWiped}
                      onCheckedChange={handleStepChange}
                    />
                    <ImagingStep
                      name={computer.name}
                      step="scriptRan"
                      property="scriptRan"
                      label="Imaging Script Ran"
                      checked={computer.scriptRan}
                      onCheckedChange={handleStepChange}
                    />
                    <ImagingStep
                      name={computer.name}
                      step="renamed"
                      property="isRenamed"
                      label="PC Renamed"
                      checked={computer.isRenamed}
                      onCheckedChange={handleStepChange}
                    />
                    <ImagingStep
                      name={computer.name}
                      step="updated"
                      property="isUpdated"
                      label="Dell Command/Windows Updates"
                      checked={computer.isUpdated}
                      onCheckedChange={handleStepChange}
                    />
                  </>
                )}
              </div>
              <div>
                <div className="border rounded-md py-1 px-1">
                  <p>Quick Actions:</p>
                  <button
                    className="disabled:opacity-25"
                    onClick={markImaged}
                    disabled={
                      !(
                        computer.isWiped &&
                        computer.scriptRan &&
                        computer.isRenamed &&
                        computer.isUpdated
                      )
                    }
                    hidden={
                      computer.isWiped &&
                      computer.scriptRan &&
                      computer.isRenamed &&
                      computer.isUpdated &&
                      props.imaged
                    }
                  >
                    Mark as Imaged
                  </button>
                  <button className="" onClick={checkOut}>
                    Check Out
                  </button>
                </div>
                {!props.imaged && (
                  <>
                    <div className="grid grid-cols-6">
                      <p className="col-span-5">Current issue:</p>
                      <p
                        className="text-right hover:underline cursor-pointer col-span-1"
                        onClick={() => setIsModalOpen(true)}
                      >
                        View All
                      </p>
                    </div>
                    <p className="h-24 overflow-auto border rounded-md py-1 px-1 ">
                      {currentIssue.description}
                    </p>
                    <p className="text-right">
                      - logged on {currentIssue.loggedOn} by{" "}
                      {currentIssue.initials}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex bg-opacity-50 my-40 items-start justify-center">
          <div className="bg-gray-600 w-1/2 border rounded-md p-4">
            <h1>{computer.name} Issue History:</h1>

            <table className="w-full">
              <thead>
                <tr>
                  <th>Issue Date</th>
                  <th>Issue Description</th>
                  <th>Logged By</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.loggedOn}</td>
                    <td>{issue.description}</td>
                    <td>{issue.initials}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Computer;
