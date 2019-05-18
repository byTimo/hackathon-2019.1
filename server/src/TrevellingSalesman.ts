export interface Point {
    x: number;
    y: number;
}

function distance(a: Point, b: Point): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function weight(p1: Point, points: Point[]) {
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

export function path(points: Point[]): Point[] {
    const count = points.length;
    let a: any = points[0];
    const r: Point[] = [a];
    points = points.slice(1);
    for (let i = 0; i < count - 1; i++) {
        a = weight(a, points).point;
        r.push(a);
        points = points.filter(p => p.x !== a.x || p.y !== a.y);
    }
    return r;
}




