import { ICurve } from './curve.interface';
import { ISpiralerOptions } from './spiraler-options.interface';

const PI = Math.PI;

//default spiral
const a: number = 350;
const b: number = 0.95;
const c: number = 2;

const defaultCurve: ICurve = {
    x: (t: number) => a * (b ** t) * Math.cos(t * PI / 3 - PI / 2),
    y: (t: number) => a * (b ** t) * Math.sin(t * PI / 3 - PI / 2),
    z: (t: number) => c * t
};

export const defaultOptions: ISpiralerOptions = {
    curve: defaultCurve,
    scaleN: (_n: number) => 1,
    scaleZ: (z: number) => Math.max(0, 1 - z / 30),
    interval: (n: number) => n,
    opacityZ: (z: number) => z < 0 ? (z > -1 ? 1 + z : 0) : Math.max(0, 1 - z / 10),
    opacityN: (n: number) => n === 0 ? 1 : Math.max(0, 1 / n),
    displayZ: (z: number) => z < -1 ? 'none' : 'block'
}