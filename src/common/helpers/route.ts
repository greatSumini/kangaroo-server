const vertexPos = [
  [
    { lat: 37.57015, lng: 126.98777 },
    { lat: 37.57015, lng: 126.992213 },
    { lat: -1, lng: -1 },
    { lat: 37.57015, lng: 126.997738 },
  ],
  [
    { lat: 37.567922, lng: 126.98777 },
    { lat: 37.567922, lng: 126.992213 },
    { lat: 37.567922, lng: 126.995036 },
    { lat: 37.567922, lng: 126.997738 },
  ],
  [
    { lat: 37.566135, lng: 126.98777 },
    { lat: 37.566135, lng: 126.992213 },
    { lat: 37.566135, lng: 126.995036 },
    { lat: 37.566135, lng: 126.997738 },
  ],
  [
    { lat: 37.564755, lng: 126.98777 },
    { lat: 37.564755, lng: 126.992213 },
    { lat: 37.564755, lng: 126.995036 },
    { lat: 37.564755, lng: 126.997738 },
  ],
  [
    { lat: 37.562402, lng: 126.98777 },
    { lat: 37.562402, lng: 126.992213 },
    { lat: -1, lng: -1 },
    { lat: -1, lng: -1 },
  ],
  [
    { lat: 37.561219, lng: 126.98777 },
    { lat: 37.561219, lng: 126.992213 },
    { lat: -1, lng: -1 },
    { lat: -1, lng: -1 },
  ],
];

interface Coordinate {
  lat: number;
  lng: number;
}

interface extra {
  currentPos: Coordinate;
  destVertex: any; // { row, col }
  dir: Coordinate;
}

const didArrive = ({ currentPos, destVertex, dir }: extra): boolean => {
  const destPos = vertexPos[destVertex.row][destVertex.col];
  if (dir.lat !== 0) {
    if (dir.lat > 0 && currentPos.lat >= destPos.lat) return true;
    else if (dir.lat < 0 && currentPos.lat <= destPos.lat) return true;
  } else {
    if (dir.lng > 0 && currentPos.lng >= destPos.lat) return true;
    else if (dir.lng < 0 && currentPos.lng <= destPos.lng) return true;
  }
  return false;
};

const getRandom = () => {
  return Math.floor(Math.random() * 3 - 1);
};
