export interface IMap {
    positionX?: number;
    positionY?: number;
    bloked?: boolean;
    type: string; //can be a teasure, a door, or just floor.
  }
  export enum enTypeMap {
    FLOOR = "floor",
    DOOR = "door",
    WALL = "wall"
  }