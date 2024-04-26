class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  normalize() {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    if (magnitude === 0) return; // Avoid division by zero
    this.x /= magnitude;
    this.y /= magnitude;
  }

  rotate(angle) {
    const radians = (angle * Math.PI) / 180;
    const newX = this.x * Math.cos(radians) - this.y * Math.sin(radians);
    const newY = this.x * Math.sin(radians) + this.y * Math.cos(radians);
    this.x = newX;
    this.y = newY;
  }

  add(otherPoint) {
    this.x += otherPoint.x;
    this.y += otherPoint.y;
  }

  subtract(otherPoint) {
    this.x -= otherPoint.x;
    this.y -= otherPoint.y;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  divide(scalar) {
    if (scalar === 0) return; // Avoid division by zero
    this.x /= scalar;
    this.y /= scalar;
  }

  distance(otherPoint) {
    const dx = this.x - otherPoint.x;
    const dy = this.y - otherPoint.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  equals(otherLine) {
    return this.start.equals(otherLine.start) && this.end.equals(otherLine.end);
  }

  toString() {
    return `[${this.start}, ${this.end}]`;
  }

  clone() {
    return new Line(this.start.clone(), this.end.clone());
  }

  length() {
    return this.start.distance(this.end);
  }

  slope() {
    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;
    if (dx === 0) return Infinity;
    return dy / dx;
  }

  shift(dx, dy) {
    this.start.x += dx;
    this.start.y += dy;
    this.end.x += dx;
    this.end.y += dy;
  }

  scale(factor, relativeTo = new Point(0, 0)) {
    // Scale relative to a point (default is the origin)
    this.start.x = relativeTo.x + factor * (this.start.x - relativeTo.x);
    this.start.y = relativeTo.y + factor * (this.start.y - relativeTo.y);
    this.end.x = relativeTo.x + factor * (this.end.x - relativeTo.x);
    this.end.y = relativeTo.y + factor * (this.end.y - relativeTo.y);
  }

  rotate(angle, relativeTo = new Point(0, 0)) {
    const translation = new Point(-relativeTo.x, -relativeTo.y);
    this.start.add(translation);
    this.end.add(translation);
    this.start.rotate(angle);
    this.end.rotate(angle);
    translation.multiply(-1);
    this.start.add(translation);
    this.end.add(translation);
  }

  midPoint() {
    return new Point(
      (this.start.x + this.end.x) / 2,
      (this.start.y + this.end.y) / 2,
    );
  }

  pointAt(t) {
    if (t < 0 || t > 1) return null;

    return new Point(
      this.start.x + t * (this.end.x - this.start.x),
      this.start.y + t * (this.end.y - this.start.y),
    );
  }

  isParallel(otherLine) {
    return this.slope() === otherLine.slope();
  }

  isPerpendicular(otherLine) {
    return this.slope() * otherLine.slope() === -1;
  }

  intersection(otherLine) {
    const x1 = this.start.x;
    const y1 = this.start.y;
    const x2 = this.end.x;
    const y2 = this.end.y;
    const x3 = otherLine.start.x;
    const y3 = otherLine.start.y;
    const x4 = otherLine.end.x;
    const y4 = otherLine.end.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) return null; // Lines are parallel or coincident

    const t = ((x3 - x4) * (y1 - y3) + (y3 - y4) * (x1 - x3)) / denominator;
    const u = ((x1 - x2) * (y1 - y3) + (y1 - y2) * (x3 - x1)) / denominator;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      const intersectionX = x1 + t * (x2 - x1);
      const intersectionY = y1 + t * (y2 - y1);
      return new Point(intersectionX, intersectionY);
    }

    return null; // Lines don't intersect within their defined segments
  }

  dotProduct(otherLine) {
    const dx1 = this.end.x - this.start.x;
    const dy1 = this.end.y - this.start.y;
    const dx2 = otherLine.end.x - otherLine.start.x;
    const dy2 = otherLine.end.y - otherLine.start.y;
    return dx1 * dx2 + dy1 * dy2;
  }

  angle() {
    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }
}

class Triangle {
  constructor(pointA, pointB, pointC) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    this.edgeAB = new Line(pointA, pointB);
    this.edgeBC = new Line(pointB, pointC);
    this.edgeCA = new Line(pointC, pointA);
    this.recalculateDerivedProperties(); // Initialize values
  }

  recalculateDerivedProperties() {
    // Angles (using Law of Cosines)
    const a = this.edgeBC.length();
    const b = this.edgeCA.length();
    const c = this.edgeAB.length();
    this.angleA =
      (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
    this.angleB =
      (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
    this.angleC = 180 - this.angleA - this.angleB;

    // Centroid (average of vertices)
    this.centroid = new Point(
      (this.pointA.x + this.pointB.x + this.pointC.x) / 3,
      (this.pointA.y + this.pointB.y + this.pointC.y) / 3,
    );
  }

  equals(otherTriangle) {
    const points1 = [this.pointA, this.pointB, this.pointC].sort((a, b) => {
      if (a.x === b.x) return a.y - b.y;
      return a.x - b.x;
    });

    const points2 = [
      otherTriangle.pointA,
      otherTriangle.pointB,
      otherTriangle.pointC,
    ].sort((a, b) => {
      if (a.x === b.x) return a.y - b.y;
      return a.x - b.x;
    });

    return (
      points1[0].equals(points2[0]) &&
      points1[1].equals(points2[1]) &&
      points1[2].equals(points2[2])
    );
  }

  toString() {
    return `Triangle: ${this.pointA}, ${this.pointB}, ${this.pointC}`;
  }

  clone() {
    return new Triangle(
      this.pointA.clone(),
      this.pointB.clone(),
      this.pointC.clone(),
    );
  }

  perimeter() {
    return this.edgeAB.length() + this.edgeBC.length() + this.edgeCA.length();
  }

  area() {
    const s = this.perimeter() / 2;
    return Math.sqrt(
      s *
        (s - this.edgeAB.length()) *
        (s - this.edgeBC.length()) *
        (s - this.edgeCA.length()),
    );
  }
}

class Polygon {
  constructor(points) {
    this.points = points;
    this.recalculateDerivedProperties();
  }

  recalculateDerivedProperties() {
    this.edges = this.calculateEdges();
    this.angles = this.calculateAngles();
    this.center = this.calculateCentroid();
  }

  calculateEdges() {
    const edges = [];
    for (let i = 0; i < this.points.length; i++) {
      edges.push(
        new Line(this.points[i], this.points[(i + 1) % this.points.length]),
      );
    }
    return edges;
  }

  calculateAngles() {
    // ... (Implementation to calculate angles using vectors and trigonometry)
  }

  calculateCentroid() {
    let sumX = 0;
    let sumY = 0;
    for (const point of this.points) {
      sumX += point.x;
      sumY += point.y;
    }
    return new Point(sumX / this.points.length, sumY / this.points.length);
  }

  equals(otherPolygon) {
    if (this.points.length !== otherPolygon.points.length) return false;

    // Find the starting point with the smallest coordinates in both polygons
    let minIndex1 = 0,
      minIndex2 = 0;
    for (let i = 1; i < this.points.length; i++) {
      if (
        this.points[i].y < this.points[minIndex1].y ||
        (this.points[i].y === this.points[minIndex1].y &&
          this.points[i].x < this.points[minIndex1].x)
      ) {
        minIndex1 = i;
      }
      if (
        otherPolygon.points[i].y < otherPolygon.points[minIndex2].y ||
        (otherPolygon.points[i].y === otherPolygon.points[minIndex2].y &&
          otherPolygon.points[i].x < otherPolygon.points[minIndex2].x)
      ) {
        minIndex2 = i;
      }
    }

    // Create sorted arrays of points, starting from the smallest coordinate
    const sortedPoints1 = this.getSortedPointsFromIndex(minIndex1);
    const sortedPoints2 = otherPolygon.getSortedPointsFromIndex(minIndex2);

    // Compare sorted points
    for (let i = 0; i < sortedPoints1.length; i++) {
      if (!sortedPoints1[i].equals(sortedPoints2[i])) {
        return false;
      }
    }
    return true;
  }

  toString() {
    return `Polygon: ${this.points.map((p) => p.toString()).join(", ")}`;
  }

  clone() {
    return new Polygon(this.points.map((p) => p.clone()));
  }

  getSortedPointsFromIndex(startIndex) {
    const sortedPoints = this.points
      .slice(startIndex)
      .concat(this.points.slice(0, startIndex));
    return sortedPoints.sort((a, b) => a.x - b.x || a.y - b.y); // Sort by x, then y
  }

  width() {
    const xCoordinates = this.points.map((point) => point.x);
    return Math.max(...xCoordinates) - Math.min(...xCoordinates);
  }

  height() {
    const yCoordinates = this.points.map((point) => point.y);
    return Math.max(...yCoordinates) - Math.min(...yCoordinates);
  }

  perimeter() {
    return this.edges.reduce((sum, edge) => sum + edge.length(), 0);
  }

  area() {
    let area = 0;

    for (let i = 1; i < this.points.length - 1; i++) {
      const triangle = new Triangle(
        this.points[0],
        this.points[i],
        this.points[i + 1],
      );
      area += triangle.area();
    }

    return Math.abs(area);
  }

  isSquare() {
    if (this.points.length !== 4) return false;

    const side1 = this.edges[0].length();

    for (let i = 1; i < 4; i++) {
      if (this.edges[i].length() !== side1) return false;
    }

    for (let i = 0; i < 4; i++) {
      const v1 = this.edges[i].end.clone().subtract(this.edges[i].start);
      const v2 = this.edges[(i + 1) % 4].end
        .clone()
        .subtract(this.edges[(i + 1) % 4].start);
      if (v1.dotProduct(v2) === 0) return true;
    }

    return false;
  }

  isRectangle() {
    if (this.points.length !== 4) return false;

    if (
      !this.edges[0].isParallel(this.edges[2]) ||
      !this.edges[1].isParallel(this.edges[3])
    ) {
      return false;
    }

    for (let i = 0; i < 4; i++) {
      const v1 = this.edges[i].end.clone().subtract(this.edges[i].start);
      const v2 = this.edges[(i + 1) % 4].end
        .clone()
        .subtract(this.edges[(i + 1) % 4].start);
      if (v1.dotProduct(v2) === 0) return true;
    }

    return false;
  }
}

class Rectangle extends Polygon {
  constructor(x, y, width, height) {
    super([
      new Point(x, y),
      new Point(x + width, y),
      new Point(x + width, y + height),
      new Point(x, y + height),
    ]);

    this.x = x;
    this.y = y;
  }
}

export { Point, Line, Triangle, Polygon, Rectangle };
