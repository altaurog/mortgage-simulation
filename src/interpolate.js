import { linear } from 'everpolate';

export function interpolate(data, x) {
  const dx = data.map(d => d.viewX);
  const dy = data.map(d => d.viewY);
  return linear(x, dx, dy);
}
