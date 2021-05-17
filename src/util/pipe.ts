export function pipe<A, B>(a: A, ab: (a: A) => B): B;

export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;

export function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): D;

export function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): E;

export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (d: E) => F
): F;

export function pipe(a: unknown, ...fs: ((a: unknown) => unknown)[]): unknown {
  return fs.reduce((acc, cur) => cur(acc), a);
}
