import { linear } from 'everpolate';

export function interpolate(data, x) {
  const dx = data.map(d => d.viewX);
  const dy = data.map(d => d.viewY);
  const y = linear(x, dx, dy);
  return x.map((v, i) => [v, y[i]]);
}
