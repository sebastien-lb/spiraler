import { ICurve } from './curve.interface';

export interface ISpiralerOptions {
    curve: ICurve;
    interval: (n: number) => number;
    scaleZ: (z: number) => number;
    scaleN: (n: number) => number;
    opacityZ: (z: number) => number;
    opacityN: (n: number) => number;
    displayZ: (z: number) => string
}
