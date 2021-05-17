import { Option, none, some } from "./Option";
import { pipe } from "./pipe";

export const empty: ReadonlyArray<never> = [];

export function toArray<A>(fa: ReadonlyArray<A>): Array<A> {
  return fa.slice();
}

export function isEmpty<A>(fa: ReadonlyArray<A>): boolean {
  return fa.length === 0;
}

export function contains<A>(v: A): (fa: ReadonlyArray<A>) => boolean {
  return exists((a) => a === v);
}

export function exists<A>(
  f: (a: A) => boolean
): (fa: ReadonlyArray<A>) => boolean {
  return (fa) => fa.some(f);
}

export function head<A>(fa: ReadonlyArray<A>): Option<A> {
  return pipe(fa, lookup(0));
}

export function tail<A>(fa: ReadonlyArray<A>): ReadonlyArray<A> {
  return fa.slice(1);
}

export function last<A>(fa: ReadonlyArray<A>): Option<A> {
  return pipe(fa, lookup(fa.length - 1));
}

export function lookup<A>(i: number): (fa: ReadonlyArray<A>) => Option<A> {
  return (fa) => {
    const a = fa[i];
    return a === undefined ? none : some(a);
  };
}

export function find<A>(
  f: (a: A) => boolean
): (fa: ReadonlyArray<A>) => Option<A> {
  return (fa) => {
    const a = fa.find(f);
    return a === undefined ? none : some(a);
  };
}

export function filter<A>(
  f: (a: A) => boolean
): (fa: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (fa) => fa.filter(f);
}

export function map<A, B>(
  f: (a: A) => B
): (fa: ReadonlyArray<A>) => ReadonlyArray<B> {
  return (fa) => fa.map(f);
}

export function flatMap<A, B>(
  f: (a: A) => ReadonlyArray<B>
): (fa: ReadonlyArray<A>) => ReadonlyArray<B> {
  return (fa) => fa.flatMap(f);
}

export function pure<A>(a: A): ReadonlyArray<A> {
  return [a];
}
