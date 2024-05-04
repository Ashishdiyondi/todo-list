import React, { useEffect, useState } from "react";
import Tasklist from "./Tasklist";

const Taskinput = ({ username }) => {
  // Define the options for priority
  const priorityOptions = ["High", "Medium", "Low"];

  function getStoredTodos() {
    return JSON.parse(localStorage.getItem(username)) || [];
  }

  const [todos, setTodos] = useState(getStoredTodos());
  const [isOutdoor, setIsOutdoor] = useState(false); // State to track if the task is outdoor
  const [placeVisible, setPlaceVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem(username, JSON.stringify(todos));
  }, [todos, username]);

  function handleSubmit(event) {
    event.preventDefault();
    let task = event.target.task.value;
    let priority = event.target.priority.value; // Get the selected priority
    let place = isOutdoor ? event.target.place.value : ""; // Get the place name for outdoor tasks

    if (!task) {
      alert("Please provide a valid task");
      return;
    }

    setTodos([
      ...todos,
      {
        task: task,
        priority: priority,
        completed: false,
        place: place,
      },
    ]);

    event.target.reset();
    // Hide the place input field after submitting the form
    setPlaceVisible(false);
  }

  // Toggle the state when the checkbox is clicked
  const handleCheckboxChange = (event) => {
    setIsOutdoor(event.target.checked);
    // Show the place input field if the outdoor checkbox is checked
    if (event.target.checked) {
      setPlaceVisible(true);
    } else {
      // Hide the place input field if the outdoor checkbox is unchecked
      setPlaceVisible(false);
    }
  };

  return (
    <div className="container my-5">
      <div
        className="mx-auto rounded border p-4"
        style={{ background: "#DDDDDD" }}
      >
        <h2 className="text-black text-center mb-5">My Todo List</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <input
                className="form-control"
                placeholder="New Task"
                name="task"
                maxLength={20}
              />
            </div>
            <div className="col-sm-3 mb-3">
              <select className="form-select" name="priority">
                {priorityOptions.map((priority, index) => (
                  <option key={index} value={priority.toLowerCase()}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="outdoorCheckbox"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="outdoorCheckbox">
                  Outdoor
                </label>
              </div>
            </div>
          </div>
          {placeVisible && (
            <div className="row">
              <div className="col-sm-9 mb-3">
                <input
                  className="form-control"
                  placeholder="Place Name"
                  name="place"
                />
              </div>
              <div className="col-sm-3 mb-3">
                <button className="btn btn-primary w-100" type="submit">
                  Add
                </button>
              </div>
            </div>
          )}
          {!placeVisible && (
            <div className="row">
              <div className="col-12">
                <button className="btn btn-primary w-100 " type="submit">
                  Add
                </button>
              </div>
            </div>
          )}
        </form>
        <Tasklist todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};
export default Taskinput;
/////////////////////////////////////////////
