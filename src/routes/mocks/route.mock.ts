import { isObjectMatch } from '@src/common/helpers/is-object.match';

import { RouteEdge } from '../entities/route-edge.entity';

const EDGE_DATA = [
  { name: 'Cityhall', lat: 37.57020019534802, lng: 126.98769470646363 },
  { name: 'Sinhan L Tower', lat: 37.5704276836966, lng: 126.99215185370193 },
  { name: 'Eulji Starbucks', lat: 37.57066855295541, lng: 126.99765575521592 },
  { name: 'Lotte world', lat: 37.57090942143521, lng: 127.00192718798598 },

  {
    name: 'Ducksu Elemental School',
    lat: 37.56617219834741,
    lng: 126.98749210886187,
  },
  {
    name: 'Eulji-lo 3ga Station',
    lat: 37.56639969899838,
    lng: 126.9926414645728,
  },
  { name: 'LG Twin Towers', lat: 37.56661381662339, lng: 126.99802718415243 },
  { name: 'Timesqure', lat: 37.5668948450722, lng: 127.00211290245421 },

  { name: 'Samsung Plaza', lat: 37.56453080675742, lng: 126.98796937582121 },
  { name: "Summoner's Lift", lat: 37.564422123418275, lng: 126.99280742934495 },
  { name: 'Sumin Home', lat: 37.564344492364704, lng: 126.99825268796683 },
  { name: 'Kindergarten', lat: 37.56460843761685, lng: 127.0023856000863 },

  { name: '63 Square', lat: 37.56116700824361, lng: 126.98885964267362 },
  { name: 'TeddyBear Museum', lat: 37.5612391838842, lng: 126.99323834912192 },
  { name: 'JunctionX Hall', lat: 37.56226390424688, lng: 126.99852679840536 },
  { name: 'Junsoo Home', lat: 37.56313954801267, lng: 127.00257428301616 },
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
