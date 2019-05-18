import React, { useEffect, useRef, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { stringify } from "querystring";

import { YMaps, Map, Placemark } from "react-yandex-maps";

import routes from "../../routes";
import { ITrip, IBar } from "../../types/common";
import { useAsync } from "../../hooks/useAsync";
import { parseSearch } from "../../lib/queryString";
import { useNodeSize } from "../../hooks/useNodeSize";

function fetchTrip(params: {
  barType: number | string;
  barsCount: number | string;
  drinkType: number | string;
}): Promise<ITrip> {
  return fetch(`/api/trips?${stringify(params)}`).then(x => x.json());
}

interface ResultProps extends RouteComponentProps {}

export function Result(props: ResultProps) {
  const contentRef = useRef<HTMLElement>(null);
  const [tripState, runFetch] = useAsync(fetchTrip);
  const [tryCount, setTryCount] = useState(0);

  useEffect(() => {
    const { barType, barsCount, drinkType } = parseSearch(
      props.location.search
    );
    runFetch({ barType, barsCount, drinkType });
  }, [tryCount, props.location.search, runFetch]);

  const contentSizes = useNodeSize(contentRef.current);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <nav>
        <a>На карте</a> &middot; <Link to={routes.resultList}>Списком</Link>
        <hr />
        <Link to={routes.room}>Дальше</Link>
      </nav>
      <section ref={contentRef} style={{ flex: 1 }}>
        {tripState.loading && <div>Loading...</div>}
        {tripState.data && (
          <ResultMap bars={tripState.data.bars} {...contentSizes} />
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

interface ResultMapProps {
  bars: IBar[];
  width: number;
  height: number;
}

function ResultMap({ bars, width, height }: ResultMapProps) {
  if (bars.length === 0) {
    return <div>Ничего не нашлось =(</div>;
  }
  return (
    <YMaps>
      <Map
        width={width}
        height={height}
        defaultState={{
          center: [bars[0].geoPosition.latitude, bars[0].geoPosition.longitude],
          zoom: 13
        }}
      >
        {bars.map(bar => (
          <Placemark
            key={bar.id}
            geometry={[bar.geoPosition.latitude, bar.geoPosition.longitude]}
          />
        ))}
      </Map>
    </YMaps>
  );
}
