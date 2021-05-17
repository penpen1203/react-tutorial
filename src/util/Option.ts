import { pipe } from "./pipe";

export type Option<A> = None | Some<A>;

export interface None {
  readonly type: "None";
}

export interface Some<A> {
  readonly type: "Some";
  readonly value: A;
}

export const none: Option<never> = { type: "None" };

export function some<A>(a: A): Option<A> {
  return { type: "Some", value: a };
}

export function isNone<A>(fa: Option<A>): fa is None {
  return fa.type === "None";
}

export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa.type === "Some";
}

export function toNullable<A>(fa: Option<A>): A | null {
  return pipe(
    fa,
    fold({
      onNone: () => null,
      onSome: (a) => a,
    })
  );
}

export function eq<A>(fa: Option<A>): (fb: Option<A>) => boolean {
  return (fb) =>
    pipe(
      fa,
      exists((a) =>
        pipe(
          fb,
          exists((b) => a === b)
        )
      )
    );
}

export function contains<A>(a: A): (fa: Option<A>) => boolean {
  return (fa) => (isNone(fa) ? false : fa.value === a);
}

export function forall<A>(f: (a: A) => boolean): (fa: Option<A>) => boolean {
  return (fa) => (isNone(fa) ? true : f(fa.value));
}

export function exists<A>(f: (a: A) => boolean): (fa: Option<A>) => boolean {
  return (fa) => (isNone(fa) ? false : f(fa.value));
}

export function getOrElse<A>(onNone: () => A): (fa: Option<A>) => A {
  return (fa) => (isNone(fa) ? onNone() : fa.value);
}

export function filter<A>(f: (a: A) => boolean): (fa: Option<A>) => Option<A> {
  return (fa) => (isNone(fa) ? none : f(fa.value) ? fa : none);
}

export function fold<A, B, C>({
  onNone,
  onSome,
}: {
  onNone: () => B;
  onSome: (a: A) => C;
}): (fa: Option<A>) => B | C {
  return (fa) => (isNone(fa) ? onNone() : onSome(fa.value));
}

export function map<A, B>(f: (a: A) => B): (fa: Option<A>) => Option<B> {
  return (fa) => (isNone(fa) ? none : some(f(fa.value)));
}

export function flatMap<A, B>(
  f: (a: A) => Option<B>
): (fa: Option<A>) => Option<B> {
  return (fa) => (isNone(fa) ? none : f(fa.value));
}

export const pure = some;
