import { RouteEdge } from '@src/routes/entities/route-edge.entity';
import { isObjectMatch } from './is-object.match';

describe('isObjectMatch', () => {
  it('성공한다.(success)', () => {
    const validInputs = [
      [{ name: 'sumin' }, { name: 'sumin' }],
      [
        { id: 0, lat: 1, lng: 2 },
        { lat: 1, lng: 2 },
      ],
      [new RouteEdge({ lat: 1, lng: 2 }), { lat: 1, lng: 2 }],
    ];

    validInputs.forEach(([origin, target]) => {
      expect(isObjectMatch(origin, target)).toEqual(true);
    });
  });

  it('실패한다(fail)', () => {
    const invalidInputs = [
      [
        { lat: 1, lng: 2 },
        { id: 0, lat: 1, lng: 2 },
      ],
      [{ lat: 1 }, null],
      [null, { lat: 1 }],
    ];

    invalidInputs.forEach(([origin, target]) => {
      expect(isObjectMatch(origin, target)).toEqual(false);
    });
  });
});
