import React, { Component } from "react";
import EmployeeRow from "./EmployeeRow/EmployeeRow";
import axios from "axios";

class Employees extends Component {
  state = {
    employees: [],
    employeesSorted: [],
    employeesFiltered: [],
    search: "",
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    axios
      .get(
        `https://randomuser.me/api/?results=25&inc=name,email,phone,dob,picture&nat=us`
      )
      .then((response) => {
        console.log(response);
        this.setState({
          employees: response.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sortByAge = () => {
    const sorted = [...this.state.employees];
    sorted.sort(
      (a, b) =>
        a.dob.date.substring(0, 10).split("-").join("") -
        b.dob.date.substring(0, 10).split("-").join("")
    );
    this.setState({
      employeesSorted: sorted,
    });
  };

  handleSearchChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  //   TODO: Submit button should FILTER the data
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("YOU PRESS BUTTON YAY");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3 col-3">
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              value={this.state.search}
              name="search"
              onChange={this.handleSearchChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col" onClick={this.sortByAge}>
                Age
              </th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>

          {this.state.employeesSorted.length ? (
            <tbody>
              {this.state.employeesSorted.map((employee, index) => (
                <EmployeeRow {...employee} key={index} />
              ))}
            </tbody>
          ) : (
            <tbody>
              {this.state.employees.map((employee, index) => (
                <EmployeeRow {...employee} key={index} />
              ))}
            </tbody>
          )}

        </table>
      </div>
    );
  }
}

export default Employees;
