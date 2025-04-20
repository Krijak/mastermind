import { createContext } from "react";

type RoutesType = {
  forside: string;
  main: string;
  gameSetup: string;
  game: string;
  gameRoomId: string;
  noRoom: string;
};

export const routes: RoutesType = {
  forside: "/",
  main: "/main",
  gameSetup: "/gameSetup",
  gameRoomId: "/game/:roomid?",
  game: "/game",
  noRoom: "/noRoom",
};

export type Tuple<
  T,
  N extends number,
  R extends T[] = []
> = R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;

export const numPegs = 4 as const;

export type PinType = Tuple<PinColors | undefined, typeof numPegs>;
export type CodeType = Tuple<Colors | undefined, typeof numPegs>;
export type PinsType = Tuple<PinType, 10>;
export type GameType = Tuple<CodeType, 10>;
export type FullGameType = {
  game: GameType;
  code: CodeType;
  pins: PinsType;
};
export type PegColor = {
  color: Colors | undefined;
};
export type NumPegsType = Tuple<Colors | undefined, typeof numPegs>;
export type PegRowType = {
  setActiveSlotAndAssignColors?: (index: number, rowNumber: number) => void;
  slots: (Colors | undefined)[];
  shadow?: boolean;
  rowNumber: number;
  activeIndex?: number;
  notVisible?: boolean;
};
export type PinColors = "black" | "white";
export type PegPinColors = { color: PinColors | undefined };
export type PegPinRowType = {
  setActiveSlotAndAssignColors?: (index: number) => void;
  slots: (PinColors | undefined)[];
  big?: boolean;
};

export type RoomIdType = string;

export const roomidLength = 5;

export const emptyGame = Array(10).fill(
  Array(numPegs).fill(undefined)
) as GameType;

export const emptyPins = Array(10).fill(
  Array(numPegs).fill(undefined)
) as PinsType;

export const emptyCode = Array(numPegs).fill(undefined) as CodeType;

export const emptyFullGame = {
  game: emptyGame,
  code: emptyCode,
  pins: emptyPins,
} as FullGameType;
export interface CodeContextType {
  fullGame: FullGameType;
  game: GameType;
  pins: PinsType;
  code: CodeType;
  useSameDevice: boolean;
  roomId: RoomIdType | undefined;
  setRoomId: (roomId: RoomIdType) => void;
  setUseSameDevice: (useSameDevice: boolean) => void;
  setFullGame: (fullGame: FullGameType) => void;
  setGame: (game: GameType) => void;
  setPins: (pins: PinsType) => void;
  setCode: (code: CodeType, isNewGame?: boolean) => void;
  resetGame: () => void;
}

export const CodeContext = createContext<CodeContextType>({
  fullGame: emptyFullGame,
  game: emptyGame,
  code: emptyCode,
  pins: emptyPins,
  useSameDevice: false,
  roomId: "",
  setUseSameDevice: (useSameDevice: boolean) => {
    useSameDevice;
  },
  setFullGame: (fullGame: FullGameType) => {
    fullGame;
  },
  setGame: (game: GameType) => {
    game;
  },
  setPins: (pins: PinsType) => {
    pins;
  },
  setCode: (code: CodeType, isNewGame?: boolean) => {
    code;
    isNewGame;
  },
  setRoomId: (roomId: RoomIdType) => {
    roomId;
  },
  resetGame: () => {},
});

// export type Colors =
//   | "#8f2c5d"
//   | "red"
//   | "pink"
//   | "orange"
//   | "#4f74a9"
//   | "lightblue";

// export const colors: Colors[] = [
//   "#8f2c5d",
//   "red",
//   "pink",
//   "orange",
//   "#4f74a9",
//   "lightblue",
// ];

export type Colors =
  | "#ffc0cb"
  | "#ff0000"
  | "#008000"
  | "#800080"
  | "#ffa500"
  | "#000000";

export const colors: Colors[] = [
  "#ffc0cb",
  "#ff0000",
  "#008000",
  "#800080",
  "#ffa500",
  "#000000",
];

export const pinColors: PinColors[] = ["black", "white"];

export const areAllCodeSlotsFilled = (code: NumPegsType): boolean => {
  return code.findIndex((slot) => slot === undefined || slot === null) == -1;
};
