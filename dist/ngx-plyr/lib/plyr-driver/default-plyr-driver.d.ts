import * as Plyr from 'plyr';
import { PlyrDriver, PlyrDriverCreateParams, PlyrDriverDestroyParams, PlyrDriverUpdateSourceParams } from './plyr-driver';
export declare class DefaultPlyrDriver implements PlyrDriver {
    create(params: PlyrDriverCreateParams): Plyr;
    updateSource(params: PlyrDriverUpdateSourceParams): void;
    destroy(params: PlyrDriverDestroyParams): void;
}
