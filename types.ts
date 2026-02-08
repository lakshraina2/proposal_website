export enum GameState {
  ASKING = 'ASKING',
  CELEBRATING = 'CELEBRATING',
  FORCED_LOVE = 'FORCED_LOVE',
}

export enum NoButtonPhase {
  INITIAL = 0,
  REALLY = 1,
  SERIOUSLY = 2,
}

export interface Position {
  top: string | number;
  left: string | number;
}
