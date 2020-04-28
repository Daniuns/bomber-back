import { IMap, enTypeMap } from '../../interfaces/map';
import { MAX_Y, MAX_X } from '../../settings';
import { applyWalls } from './applyWalls';
class Map {
    private myMap: IMap[][] = [[]];

    generateMap = () => {
        for (let y = 0; y <= MAX_Y; y++) {
          for (let x = 0; x <= MAX_X; x++) {
            if (!(this.myMap[y] instanceof Array)) {
              this.myMap[y] = [];
            }
    
            this.myMap[y][x] = {
              positionY: y,
              positionX: x,
              type: this.type(x, y),
              bloked: false
            };
    
            if (this.myMap[y][x].type === enTypeMap.WALL) {
              this.myMap[y][x] = { ...this.myMap[y][x], bloked: true };
            }
          }
        }
    
        return this.myMap;
      };

      type = (x: number, y: number): string => {
        let type = "";
    
        for (let i = 0; i < applyWalls.length; i++) {
          if (applyWalls[i].x === x && applyWalls[i].y === y) {
            type = enTypeMap.WALL;
          }
        }
    
        if (!type) {
          type = enTypeMap.FLOOR;
        }
    
        return type;
      };
}

const mapService = new Map()
export default mapService;