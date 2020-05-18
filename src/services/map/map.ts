import { IMap, enTypeMap } from '../../interfaces/map';
import { MAX_Y, MAX_X } from '../../settings';
import { applyWalls } from './applyWalls';
class Map {
    private myMap: IMap[][] = [[]];

    generateMap = () => {
    for(var i=0; i<= MAX_Y; i++) {
        this.myMap[i] = new Array(MAX_X);
    }


        for (let y = 0; y <= MAX_Y; y++) {
          for (let x = 0; x <= MAX_X; x++) {
            if (!(this.myMap[y] instanceof Array)) {
              this.myMap[y] = [];
            }

            if(!this.myMap[y][x]){
      
              this.myMap[y][x] = {
                positionY: y,
                positionX: x,
                type: this.type(x, y),
                bloked: undefined
              };
  
  
              if (this.myMap[y][x].type === enTypeMap.WALL && this.myMap[y][x].bloked === undefined) {
                this.myMap[y][x] = { ...this.myMap[y][x], bloked: true };
                this.myMap[y+1][x] = {  positionY: y+1,
                positionX: x,
                type: 'floor',
                bloked: true };
                this.myMap[y][x+1] = { positionY: y,
                  positionX: x+1,
                  type: 'floor',
                  bloked: true };
                this.myMap[y+1][x+1] = {  positionY: y+1,
                  positionX: x+1,
                  type: 'floor',
                   bloked: true };
              }

            }
          }
        }
        this.myMap
        console.log('checking', this.myMap);
        
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