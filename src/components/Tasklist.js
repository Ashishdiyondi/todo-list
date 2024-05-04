import React, { useEffect, useState } from "react";
import axios from "axios";

const Tasklist = ({ todos, setTodos }) => {
  const [weatherData, setWeatherData] = useState({}); // State to store weather data for each todo item

  useEffect(() => {
    // Fetch weather data for each todo item when the component mounts or when the todos state changes
    const fetchWeatherData = async () => {
      try {
        for (const todo of todos) {
          if (todo.place) {
            const response = await axios.get(
              `http://api.openweathermap.org/geo/1.0/direct?q=${
                todo.place
              }&limit=1&appid=${"780bcdd791b565e6daa208049430d9fd"}`
            );
            const { lat, lon } = response.data[0];
            const weatherResponse = await axios.get(
              `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"780bcdd791b565e6daa208049430d9fd"}&units=metric`
            );
            const weather = {
              temperature: weatherResponse.data.main.temp,
              icon: weatherResponse.data.weather[0].icon,
            };
            setWeatherData((prevData) => ({
              ...prevData,
              [todo.place]: weather,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [todos]);

  function changeTaskStatus(index) {
    let newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function deleteTask(index) {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return todos.map((todo, index) => {
    let priorityColor;
    switch (todo.priority) {
      case "high":
        priorityColor = "#ff3d3d";
        break;
      case "medium":
        priorityColor = "#ffff3d";
        break;
      case "low":
        priorityColor = "#74DA2F";
        break;
      default:
        priorityColor = "pink";
        break;
    }

    return (
      <div
        key={index}
        className="rounded mt-4 p-2 d-flex justify-content-center"
        style={{ backgroundColor: priorityColor, height: "50px" }}
      >
        <div
          className="me-auto mt-1"
          style={{
            // backgroundColor: "wheat",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </div>
        <div
          className="d-flex align-items-center"
          // style={{ backgroundColor: "brown" }}
        >
          {todo.place && weatherData[todo.place] && (
            <img
              src={`http://openweathermap.org/img/wn/${
                weatherData[todo.place].icon
              }.png`}
              alt="Weather Icon"
              className="mb-1"
              style={{
                // backgroundColor: "lightgreen",
                width: "40px",
                height: "40px",
                marginRight: "10px",
              }}
            />
          )}
          <i
            className={
              "h4 me-2 " +
              (todo.completed
                ? "bi bi-check-square text-black"
                : "bi bi-square text-black")
            }
            style={{ cursor: "pointer" }}
            onClick={() => changeTaskStatus(index)}
          ></i>
          <i
            className="bi bi-trash text-black h4"
            style={{ cursor: "pointer" }}
            onClick={() => deleteTask(index)}
          ></i>
        </div>
      </div>
    );
  });
};

export default Tasklist;
