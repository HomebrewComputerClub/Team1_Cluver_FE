import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IClub {
  id: number;
  name: string;
  description: string;
  img: string;
  status: "PUBLIC" | "PRIVATE";
  code: string;
}

export interface IManager {
  id: number;
  email: string;
  loginID: string;
  name: string;
}

const { persistAtom } = recoilPersist({
  key: "manager",
  storage: localStorage,
});

export const manager = atom<IManager>({
  key: "manager",
  default: undefined,
  effects: [persistAtom],
});

export const clubID = atom({ key: "clubID", default: -1 });
