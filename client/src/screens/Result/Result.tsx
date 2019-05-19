import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { TripMap } from "../../components/TripMap/TripMap";

import { useTrip } from "../../contexts/TripContext";
import { IGeoPosition, ITrip } from "../../types/common";

import { useAsync } from "../../hooks/useAsync";
import { useNodeSize } from "../../hooks/useNodeSize";
import { useUserCoordinates } from "../../hooks/useUserCoordinates";

import { parseSearch, stringify } from "../../lib/queryString";

import routes from "../../routes";

function fetchTrip(
  position: IGeoPosition,
  params: {
    barType: number | string;
    barsCount: number | string;
    drinkType: number | string;
  }
): Promise<ITrip> {
  return fetch(`/api/trips?${stringify(position)}&${stringify(params)}`).then(
    x => x.json()
  );
}

interface ResultProps extends RouteComponentProps {}

export function Result(props: ResultProps) {
  const currentPosition = useUserCoordinates();
  const contentRef = useRef<HTMLElement>(null);
  const [tripState, runFetch] = useAsync(fetchTrip);
  const [tryCount, setTryCount] = useState(0);
  const { setTrip } = useTrip();

  useEffect(() => {
    const { barType, barsCount, drinkType } = parseSearch(
      props.location.search
    );
    if (currentPosition) {
      runFetch(currentPosition, { barType, barsCount, drinkType });
    }
  }, [tryCount, props.location.search, runFetch, Boolean(currentPosition)]);

  const contentSizes = useNodeSize(contentRef.current);

  const handleSelect = useCallback(() => {
    if (!tripState.data) {
      return;
    }
    setTrip(tripState.data);
    props.history.push(routes.navigation);
  }, [tripState.data, props.history, setTrip]);

  const handleReload = useCallback(() => {
    setTryCount(tryCount + 1);
  }, [tryCount]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <nav>
        <span>На карте</span> &middot;{" "}
        <Link to={routes.resultList}>Списком</Link>
        <hr />
        <button onClick={handleSelect}>Выбрать</button>
        <button onClick={handleReload}>Другой</button>
      </nav>
      <section ref={contentRef} style={{ flex: 1 }}>
        {tripState.loading && <div>Loading...</div>}
        {tripState.data && (
          <TripMap bars={tripState.data.bars} {...contentSizes} />
        )}
        {tripState.error && (
          <div>
            <h2>Что-то пошло не так :(</h2>
            <button onClick={() => setTryCount(() => tryCount + 1)}>
              Попробовать снова
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
