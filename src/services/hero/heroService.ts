import { IMap, enTypeMap } from '../../interfaces/map';
import { MAX_Y, MAX_X } from '../../settings';
import { IHero } from '../../interfaces/hero';
import { startPoints } from '../map/startPoints';

class Heroes {
    private heroes: IHero[] = [];

    getHeroes = () => {
        return this.heroes;
    }

    setHero = async (hero: IHero) => {
        const newHeroesList = [...this.heroes.filter(h => h.id !== hero.id), hero];
        this.heroes = newHeroesList;
    }

    disconnected = (id: string) => {
        this.heroes = this.heroes.filter(h => h.id !== id);
        console.log('disconnected: ', id);

        console.log('actual heroes: ', this.heroes);
    }

    createHero = (id: string) => {
        const position = startPoints.map(
            st => {
                const condition = this.heroes.every(
                    h => st.positionX !== h.positionX || 
                        st.positionY !== h.positionY
                )
                if(condition) return st;
            }
        ).filter(v => !!v)[0];
        if(!position) return;

        const newHero = {...position, id, speed: 0.6, img: 'BmanF00'};

        this.heroes = [...this.heroes, newHero];
            console.log('newHero', newHero);
            console.log('listHero', this.heroes);
        return newHero;

    }
}

const heroesService = new Heroes()
export default heroesService;