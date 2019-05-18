import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface SettingsProps {}

export class Settings extends React.Component<SettingsProps> {
  state = {
    name: "",
    weight: "",
    height: "",
    sex: "male"
  };

  handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  handleChange = (
    evt: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    this.setState({
      [evt.currentTarget.name]: evt.currentTarget.value
    });
  };

  render() {
    const { name, sex, weight, height } = this.state;

    return (
      <div>
        <Link to={routes.filter}>Назад</Link>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="name">Имя</label>
            <input
              id="name"
              type="text"
              value={name}
              name="name"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="weight">Масса</label>
            <input
              id="weight"
              type="number"
              value={weight}
              name="weight"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="height">Рост</label>
            <input
              id="height"
              type="number"
              name="height"
              value={height}
              onChange={this.handleChange}
            />
          </p>
          <fieldset>
            <legend>Пол</legend>

            <input
              type="radio"
              name="sex"
              id="male"
              value="male"
              checked={sex === "male"}
              onChange={this.handleChange}
            />
            <label htmlFor="male">М</label>

            <input
              type="radio"
              name="sex"
              id="female"
              value="female"
              checked={sex === "female"}
              onChange={this.handleChange}
            />
            <label htmlFor="female">Ж</label>
          </fieldset>
        </form>
      </div>
    );
  }
}
