export type Action = PlaceMark | JumpHistory;

export interface PlaceMark {
  readonly type: "PlaceMark";
  readonly index: number;
}

export const placeMark = (index: number): PlaceMark => {
  return { type: "PlaceMark", index };
};

export interface JumpHistory {
  readonly type: "JumpHistory";
  readonly step: number;
}

export const jumpHistory = (step: number): JumpHistory => {
  return { type: "JumpHistory", step };
};
