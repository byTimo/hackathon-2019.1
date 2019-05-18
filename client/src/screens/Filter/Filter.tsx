import React from "react";
import {Link} from "react-router-dom";
import querystring from "querystring";
import routes from "../../routes";
import {RouteComponentProps} from "react-router";

interface FilterProps extends RouteComponentProps {
}

export class Filter extends React.Component<FilterProps> {
    state = {
        barType: "0",
        beerType: "0",
        vineType: "0",
        barsCount: "3"
    };

    parseData = () => {
        const {barType, beerType, vineType, barsCount} = this.state;

        const obj = {
            barType,
            barsCount
        };

        if (barType === "0") {
            return {
                ...obj,
                drinkType: beerType
            };
        }

        if (barType === "1") {
            return {
                ...obj,
                drinkType: vineType
            };
        }

        if (barType === "2") {
            return {
                ...obj,
            }
        }
    };

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const params = querystring.stringify(this.parseData());
        this.props.history.push(`${routes.result}?${params}`);
    };

    handleChange = (
        evt: React.FormEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        this.setState({
            [evt.currentTarget.name]: evt.currentTarget.value
        });
    };

    render() {
        const {barType, beerType, vineType, barsCount} = this.state;

        return (
            <div>
                <Link to={routes.settings}>Настройки</Link>

                <form onSubmit={this.handleSubmit}>
                    <select
                        value={barType}
                        name="drinkType"
                        onChange={this.handleChange}
                    >
                        <option value="0">Пиво</option>
                        <option value="1">Вино</option>
                        <option value="2">Крепкий алкоголь</option>
                    </select>

                    {barType === "0" && (
                        <fieldset>
                            <legend>Пиво</legend>

                            <input
                                type="radio"
                                name="beerType"
                                id="beerType0"
                                value="0"
                                onChange={this.handleChange}
                                checked={beerType === "0"}
                            />
                            <label htmlFor="beerType0">Светлое</label>

                            <input
                                type="radio"
                                name="beerType"
                                id="beerType1"
                                value="1"
                                checked={beerType === "1"}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="beerType1">Тёмное</label>
                        </fieldset>
                    )}

                    {barType === "1" && (
                        <fieldset>
                            <legend>Вино</legend>

                            <input
                                type="radio"
                                name="vineType"
                                id="vineType0"
                                value="0"
                                onChange={this.handleChange}
                                checked={vineType === "0"}
                            />
                            <label htmlFor="vineType0">Белое</label>

                            <input
                                type="radio"
                                name="vineType"
                                id="vineType0"
                                value="1"
                                onChange={this.handleChange}
                                checked={vineType === "1"}
                            />
                            <label htmlFor="vineType0">Красная</label>
                        </fieldset>
                    )}

                    <fieldset>
                        <legend>Количество баров</legend>

                        <input
                            type="radio"
                            name="barsCount"
                            id="barsCount3"
                            value="3"
                            onChange={this.handleChange}
                            checked={barsCount === "3"}
                        />
                        <label htmlFor="barsCount3">3</label>

                        <input
                            type="radio"
                            name="barsCount"
                            id="barsCount5"
                            value="5"
                            onChange={this.handleChange}
                            checked={barsCount === "5"}
                        />
                        <label htmlFor="barsCount5">5</label>

                        <input
                            type="radio"
                            name="barsCount"
                            id="barsCount8"
                            value="8"
                            onChange={this.handleChange}
                            checked={barsCount === "8"}
                        />
                        <label htmlFor="barsCount8">8 баров</label>
                    </fieldset>

                    <button>Подобрать маршрут</button>
                </form>
            </div>
        );
    }
}
