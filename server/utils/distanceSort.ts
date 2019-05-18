import {GeoPosition} from "../src/models/GeoPosition";

function distance(a: GeoPosition, b: GeoPosition): number {
    const dx = b.latitude - a.latitude;
    const dy = b.longitude - a.longitude;
    return Math.sqrt(dx * dx + dy * dy);
}

export function distanceWeight(p1: GeoPosition, points: GeoPosition[]) {
    let result = Number.MAX_VALUE;
    let p2 = null;

    for (const other of points) {
        const d = distance(p1, other);
        if (d !== 0 && result >= d) {
            p2 = other;
            result = d;
        }
    }

    return {weight: result, point: p2};
}

export function distanceSort(points: GeoPosition[]): GeoPosition[] {
    const count = points.length;
    let current: GeoPosition = points[0];
    const results: GeoPosition[] = [current];

    points = points.slice(1);
    for (let i = 0; i < count - 1; i++) {
        current = distanceWeight(current, points).point!;
        results.push(current);
        points = points.filter(p => !GeoPosition.equal(p, current));
    }
    return results;
}




