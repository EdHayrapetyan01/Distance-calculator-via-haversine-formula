// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import CalculateDistance from '../src/services/CalculateDistance';

describe('calculating the distance between two cities', () => {
  test('returns object with 3 fields', () => {
    const result = CalculateDistance(
      ['Nantes', 47.218371, -1.553621],
      ['Toulon', 43.124228, 5.928],
    );
    expect(result).resolves.toHaveProperty('origin');
    expect(result).resolves.toHaveProperty('destination');
    expect(result).resolves.toHaveProperty('distance');
  });

  test('return 0 if values are equal', () => {
    const result = CalculateDistance(
      ['Nantes', 47.218371, -1.553621],
      ['Nantes', 47.218371, -1.553621],
    );
    expect(result).resolves.toStrictEqual({
      destination: 'Nantes',
      origin: 'Nantes',
      distance: 0,
    });
  });

  test('produce the accurate output based on the provided arguments', () => {
    const result = CalculateDistance(['SomeCity', 50, 30], ['SomeCity', 60, 40]);
    expect(result).resolves.toStrictEqual({
      destination: 'SomeCity',
      origin: 'SomeCity',
      distance: 1279,
    });
  });

  test('throw an arrow if some arguments wrong of missed', () => {
    const res1 = CalculateDistance(undefined, ['SomeCity', 60, 40]);
    const res2 = CalculateDistance();
    const res3 = CalculateDistance(['SomeCity', 60, 40]);
    const res4 = CalculateDistance(undefined, undefined);
    expect(res1).rejects.toThrowError('Invalid or missing parameters provided');
    expect(res2).rejects.toThrowError('Invalid or missing parameters provided');
    expect(res3).rejects.toThrowError('Invalid or missing parameters provided');
    expect(res4).rejects.toThrowError('Invalid or missing parameters provided');
  });
});
