import { isObjectMatch } from '@src/common/helpers/is-object.match';
import { RouteEdge } from '../entities/route-edge.entity';

const EDGE_DATA = [
  { name: 'Cityhall', lat: 37.57015, lng: 126.98777 },
  { name: 'Sinhan L Tower', lat: 37.57015, lng: 126.992213 },
  null,
  { name: 'Eulji Starbucks', lat: 37.57015, lng: 126.997738 },
  { name: 'Ducksu Elemental School', lat: 37.567922, lng: 126.98777 },
  { name: 'Eulji-lo 3ga Station', lat: 37.567922, lng: 126.992213 },
  { name: 'LG Twin Towers', lat: 37.567922, lng: 126.995036 },
  { name: '63 Square', lat: 37.567922, lng: 126.997738 },
  { name: 'Samsung Plaza', lat: 37.566135, lng: 126.98777 },
  { name: "Summoner's Lift", lat: 37.566135, lng: 126.992213 },
  { name: 'Sumin Home', lat: 37.566135, lng: 126.995036 },
  { name: 'Kindergarten', lat: 37.566135, lng: 126.997738 },
  { name: 'TeddyBear Museum', lat: 37.564755, lng: 126.98777 },
  { name: 'Lotte world', lat: 37.564755, lng: 126.992213 },
  { name: 'Timesqure', lat: 37.564755, lng: 126.995036 },
  { name: 'JunctionX Hall', lat: 37.564755, lng: 126.997738 },
  { name: 'Junsoo Home', lat: 37.562402, lng: 126.98777 },
  { name: 'The Hyundai Seoul', lat: 37.562402, lng: 126.992213 },
  null,
  null,
  { name: 'COEX', lat: 37.561219, lng: 126.98777 },
  { name: '63 Building', lat: 37.561219, lng: 126.992213 },
  null,
  null,
];
const WIDTH = Math.round(Math.sqrt(EDGE_DATA.length));

const findDataIndex = (lat: number, lng: number): number =>
  EDGE_DATA.findIndex((data) => isObjectMatch(data, { lat, lng }));

const fillAvailableEdges = (edges: RouteEdge[]): RouteEdge[] => {
  return edges.map((edge) => {
    const dataIndex = findDataIndex(edge.lat, edge.lng);

    return new RouteEdge({
      ...edge,
      availables: getAroundIndice(dataIndex)
        .filter((aroundDataIndex) => EDGE_DATA[aroundDataIndex])
        .map((availableDataIndex) =>
          edges.find((_edge) => {
            const { lat, lng } = EDGE_DATA[availableDataIndex];
            return _edge.lat === lat && _edge.lng === lng;
          })
        ),
    });
  });
};

const isAvailableCoordinate = ([x, y]: [number, number]): boolean =>
  x >= 0 && x < WIDTH && y >= 0 && y < WIDTH;

const getAroundIndice = (index: number): number[] => {
  const x = index % WIDTH;
  const y = Math.floor(index / WIDTH);

  return [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
    .filter(([diffX, diffY]) => isAvailableCoordinate([x + diffX, y + diffY]))
    .map(([diffX, diffY]) => x + diffX + (y + diffY) * WIDTH);
};

export const routeEdgeMocks: RouteEdge[] = fillAvailableEdges(
  EDGE_DATA.filter((data) => data).map((input) => new RouteEdge(input))
);
