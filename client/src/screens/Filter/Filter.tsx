import React from "react";
import routes from "../../routes";
import { RouteComponentProps } from "react-router";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { BarType, BeerType, VineType } from "../../types/common";
import Gapped from "../../components/Gapped";
import * as querystring from "querystring";
import { Panel } from "../../components/Panel";
import { stringify } from "../../lib/queryString";
import { getCurrent } from "../../hooks/useUserCoordinates";
import { TripContextValue, withTrip } from "../../contexts/TripContext";

interface FilterProps extends RouteComponentProps, TripContextValue {}

interface FilterState {
  barType: BarType;
  beerType: BeerType;
  vineType: VineType;
  barsCount: number;
}

class FilterInternal extends React.Component<FilterProps, FilterState> {
  state: FilterState = {
    barType: BarType.BEER,
    beerType: BeerType.STOUT,
    vineType: VineType.RED,
    barsCount: 3
  };

  render() {
    return (
      <Panel width={270}>
        <Gapped gap={15} vertical>
          <Select
            value={this.state.barType!}
            onChange={e => this.setState({ barType: Number(e.target.value) })}
          >
            <MenuItem value={BarType.BEER}>Пиво</MenuItem>
            <MenuItem value={BarType.VINE}>Вино</MenuItem>
            <MenuItem value={BarType.STRONG}>Крепкие напитки</MenuItem>
          </Select>

          {this.renderDrinkType()}

          <TextField
            label="Количество баров"
            value={this.state.barsCount || ""}
            onChange={v => this.setState({ barsCount: Number(v.target.value) })}
          />

          <Button onClick={this.handleClick}>Подобрать маршрут</Button>
        </Gapped>
      </Panel>
    );
  }

  private renderDrinkType = () => {
    switch (this.state.barType) {
      case BarType.BEER:
        return (
          <Select
            value={this.state.beerType!}
            onChange={e => this.setState({ beerType: Number(e.target.value) })}
          >
            <MenuItem value={BeerType.STOUT}>Стаут</MenuItem>
            <MenuItem value={BeerType.LAGGER}>Лагер</MenuItem>
          </Select>
        );
      case BarType.VINE:
        return (
          <Select
            value={this.state.vineType!}
            onChange={e => this.setState({ vineType: Number(e.target.value) })}
          >
            <MenuItem value={VineType.RED}>Красное</MenuItem>
            <MenuItem value={VineType.WHITE}>Белое</MenuItem>
          </Select>
        );
      default:
        return null;
    }
  };

  private handleClick = async () => {
    const position = getCurrent();
    const params = querystring.stringify(this.parseData());
    const response = await fetch(`/api/trips?${stringify(position)}&${params}`);
    if (!response.ok) {
      throw new Error("Гавно какое-то");
    }
    const trip = await response.json();
    this.props.setTrip(trip);
    this.props.history.push(`${routes.map.trip}?${params}`);
  };

  private parseData = () => {
    const { barType, beerType, vineType, barsCount } = this.state;

    const obj = {
      barType,
      barsCount
    };

    switch (barType) {
      case BarType.BEER:
        return {
          ...obj,
          drinkType: beerType
        };
      case BarType.VINE:
        return {
          ...obj,
          drinkType: vineType
        };
      case BarType.STRONG:
        return obj;
    }
  };
}

export const Filter = withTrip(FilterInternal);
