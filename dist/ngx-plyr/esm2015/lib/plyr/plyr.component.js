/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import * as Plyr from 'plyr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DefaultPlyrDriver } from '../plyr-driver/default-plyr-driver';
export class PlyrComponent {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(elementRef, ngZone, renderer) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.playerChange = new BehaviorSubject(null);
        this.events = new Map();
        this.plyrType = 'video';
        // ngx-plyr events
        this.plyrInit = (/** @type {?} */ (this.playerChange.pipe(filter((/**
         * @param {?} player
         * @return {?}
         */
        player => !!player)))));
        // standard media events
        this.plyrProgress = this.createLazyEvent('progress');
        this.plyrPlaying = this.createLazyEvent('playing');
        this.plyrPlay = this.createLazyEvent('play');
        this.plyrPause = this.createLazyEvent('pause');
        this.plyrTimeUpdate = this.createLazyEvent('timeupdate');
        this.plyrVolumeChange = this.createLazyEvent('volumechange');
        this.plyrSeeking = this.createLazyEvent('seeking');
        this.plyrSeeked = this.createLazyEvent('seeked');
        this.plyrRateChange = this.createLazyEvent('ratechange');
        this.plyrEnded = this.createLazyEvent('ended');
        this.plyrEnterFullScreen = this.createLazyEvent('enterfullscreen');
        this.plyrExitFullScreen = this.createLazyEvent('exitfullscreen');
        this.plyrCaptionsEnabled = this.createLazyEvent('captionsenabled');
        this.plyrCaptionsDisabled = this.createLazyEvent('captionsdisabled');
        this.plyrLanguageChange = this.createLazyEvent('languagechange');
        this.plyrControlsHidden = this.createLazyEvent('controlshidden');
        this.plyrControlsShown = this.createLazyEvent('controlsshown');
        this.plyrReady = this.createLazyEvent('ready');
        // HTML5 events
        this.plyrLoadStart = this.createLazyEvent('loadstart');
        this.plyrLoadedData = this.createLazyEvent('loadeddata');
        this.plyrLoadedMetadata = this.createLazyEvent('loadedmetadata');
        this.plyrQualityChange = this.createLazyEvent('qualitychange');
        this.plyrCanPlay = this.createLazyEvent('canplay');
        this.plyrCanPlayThrough = this.createLazyEvent('canplaythrough');
        this.plyrStalled = this.createLazyEvent('stalled');
        this.plyrWaiting = this.createLazyEvent('waiting');
        this.plyrEmptied = this.createLazyEvent('emptied');
        this.plyrCueChange = this.createLazyEvent('cuechange');
        this.plyrError = this.createLazyEvent('error');
        // YouTube events
        this.plyrStateChange = this.createLazyEvent('statechange');
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    get player() {
        return this.playerChange.getValue();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.subscriptions.push(this.plyrInit.pipe(first()).subscribe((/**
         * @param {?} player
         * @return {?}
         */
        (player) => {
            /** @type {?} */
            const reinitTriggers = [changes.plyrOptions, changes.plyrPlaysInline, changes.plyrCrossOrigin].filter((/**
             * @param {?} t
             * @return {?}
             */
            t => !!t));
            if (reinitTriggers.length) {
                if (reinitTriggers.some((/**
                 * @param {?} t
                 * @return {?}
                 */
                t => !t.firstChange))) {
                    this.initPlyr(true);
                }
            }
            else {
                this.updatePlyrSource(player);
            }
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyPlayer();
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => s.unsubscribe()));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initPlyr();
    }
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    initPlyr(force = false) {
        if (force || !this.player) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.destroyPlayer();
                this.driver = this.plyrDriver || new DefaultPlyrDriver();
                this.ensureVideoElement();
                /** @type {?} */
                const newPlayer = this.driver.create({
                    videoElement: this.videoElement,
                    options: this.plyrOptions,
                });
                this.updatePlyrSource(newPlayer);
                this.playerChange.next(newPlayer);
            }));
        }
    }
    /**
     * @private
     * @param {?} plyr
     * @return {?}
     */
    updatePlyrSource(plyr) {
        this.driver.updateSource({
            videoElement: this.videoElement,
            plyr,
            source: {
                type: this.plyrType,
                title: this.plyrTitle,
                sources: this.plyrSources,
                poster: this.plyrPoster,
                tracks: this.plyrTracks,
            },
        });
    }
    // see https://stackoverflow.com/a/53704102/1990451
    /**
     * @private
     * @template T
     * @param {?} name
     * @return {?}
     */
    createLazyEvent(name) {
        return (/** @type {?} */ (this.plyrInit.pipe(switchMap((/**
         * @return {?}
         */
        () => new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => this.on(name, (/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.ngZone.run((/**
         * @return {?}
         */
        () => observer.next(data))))))))))));
    }
    /**
     * @private
     * @return {?}
     */
    destroyPlayer() {
        if (this.player) {
            Array.from(this.events.keys()).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => this.off(name)));
            this.driver.destroy({
                plyr: this.player,
            });
            this.videoElement = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    get hostElement() {
        return this.elementRef.nativeElement;
    }
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    /**
     * @private
     * @return {?}
     */
    ensureVideoElement() {
        /** @type {?} */
        const videoElement = this.hostElement.querySelector('video');
        if (videoElement) {
            this.videoElement = videoElement;
        }
        else {
            this.videoElement = this.renderer.createElement('video');
            this.videoElement.controls = true;
            if (this.plyrCrossOrigin) {
                this.videoElement.setAttribute('crossorigin', '');
            }
            if (this.plyrPlaysInline) {
                this.videoElement.setAttribute('playsinline', '');
            }
            this.renderer.appendChild(this.hostElement, this.videoElement);
        }
    }
    /**
     * @private
     * @param {?} name
     * @param {?} handler
     * @return {?}
     */
    on(name, handler) {
        this.events.set(name, handler);
        this.player.on((/** @type {?} */ (name)), handler);
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    off(name) {
        this.player.off((/** @type {?} */ (name)), this.events.get(name));
        this.events.delete(name);
    }
}
PlyrComponent.decorators = [
    { type: Component, args: [{
                selector: 'plyr, [plyr]',
                // tslint:disable-line
                template: "",
                exportAs: 'plyr',
                styles: [""]
            }] }
];
/** @nocollapse */
PlyrComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
PlyrComponent.propDecorators = {
    plyrDriver: [{ type: Input }],
    plyrType: [{ type: Input }],
    plyrTitle: [{ type: Input }],
    plyrPoster: [{ type: Input }],
    plyrSources: [{ type: Input }],
    plyrTracks: [{ type: Input }],
    plyrOptions: [{ type: Input }],
    plyrCrossOrigin: [{ type: Input }],
    plyrPlaysInline: [{ type: Input }],
    vr: [{ type: ViewChild, args: ['v', { static: false },] }],
    plyrInit: [{ type: Output }],
    plyrProgress: [{ type: Output }],
    plyrPlaying: [{ type: Output }],
    plyrPlay: [{ type: Output }],
    plyrPause: [{ type: Output }],
    plyrTimeUpdate: [{ type: Output }],
    plyrVolumeChange: [{ type: Output }],
    plyrSeeking: [{ type: Output }],
    plyrSeeked: [{ type: Output }],
    plyrRateChange: [{ type: Output }],
    plyrEnded: [{ type: Output }],
    plyrEnterFullScreen: [{ type: Output }],
    plyrExitFullScreen: [{ type: Output }],
    plyrCaptionsEnabled: [{ type: Output }],
    plyrCaptionsDisabled: [{ type: Output }],
    plyrLanguageChange: [{ type: Output }],
    plyrControlsHidden: [{ type: Output }],
    plyrControlsShown: [{ type: Output }],
    plyrReady: [{ type: Output }],
    plyrLoadStart: [{ type: Output }],
    plyrLoadedData: [{ type: Output }],
    plyrLoadedMetadata: [{ type: Output }],
    plyrQualityChange: [{ type: Output }],
    plyrCanPlay: [{ type: Output }],
    plyrCanPlayThrough: [{ type: Output }],
    plyrStalled: [{ type: Output }],
    plyrWaiting: [{ type: Output }],
    plyrEmptied: [{ type: Output }],
    plyrCueChange: [{ type: Output }],
    plyrError: [{ type: Output }],
    plyrStateChange: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.playerChange;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.events;
    /** @type {?} */
    PlyrComponent.prototype.plyrDriver;
    /** @type {?} */
    PlyrComponent.prototype.plyrType;
    /** @type {?} */
    PlyrComponent.prototype.plyrTitle;
    /** @type {?} */
    PlyrComponent.prototype.plyrPoster;
    /** @type {?} */
    PlyrComponent.prototype.plyrSources;
    /** @type {?} */
    PlyrComponent.prototype.plyrTracks;
    /** @type {?} */
    PlyrComponent.prototype.plyrOptions;
    /** @type {?} */
    PlyrComponent.prototype.plyrCrossOrigin;
    /** @type {?} */
    PlyrComponent.prototype.plyrPlaysInline;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.vr;
    /** @type {?} */
    PlyrComponent.prototype.plyrInit;
    /** @type {?} */
    PlyrComponent.prototype.plyrProgress;
    /** @type {?} */
    PlyrComponent.prototype.plyrPlaying;
    /** @type {?} */
    PlyrComponent.prototype.plyrPlay;
    /** @type {?} */
    PlyrComponent.prototype.plyrPause;
    /** @type {?} */
    PlyrComponent.prototype.plyrTimeUpdate;
    /** @type {?} */
    PlyrComponent.prototype.plyrVolumeChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrSeeking;
    /** @type {?} */
    PlyrComponent.prototype.plyrSeeked;
    /** @type {?} */
    PlyrComponent.prototype.plyrRateChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrEnded;
    /** @type {?} */
    PlyrComponent.prototype.plyrEnterFullScreen;
    /** @type {?} */
    PlyrComponent.prototype.plyrExitFullScreen;
    /** @type {?} */
    PlyrComponent.prototype.plyrCaptionsEnabled;
    /** @type {?} */
    PlyrComponent.prototype.plyrCaptionsDisabled;
    /** @type {?} */
    PlyrComponent.prototype.plyrLanguageChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrControlsHidden;
    /** @type {?} */
    PlyrComponent.prototype.plyrControlsShown;
    /** @type {?} */
    PlyrComponent.prototype.plyrReady;
    /** @type {?} */
    PlyrComponent.prototype.plyrLoadStart;
    /** @type {?} */
    PlyrComponent.prototype.plyrLoadedData;
    /** @type {?} */
    PlyrComponent.prototype.plyrLoadedMetadata;
    /** @type {?} */
    PlyrComponent.prototype.plyrQualityChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrCanPlay;
    /** @type {?} */
    PlyrComponent.prototype.plyrCanPlayThrough;
    /** @type {?} */
    PlyrComponent.prototype.plyrStalled;
    /** @type {?} */
    PlyrComponent.prototype.plyrWaiting;
    /** @type {?} */
    PlyrComponent.prototype.plyrEmptied;
    /** @type {?} */
    PlyrComponent.prototype.plyrCueChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrError;
    /** @type {?} */
    PlyrComponent.prototype.plyrStateChange;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.driver;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.videoElement;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx5ci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGx5ci8iLCJzb3VyY2VzIjpbImxpYi9wbHlyL3BseXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQWdCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFTdkUsTUFBTSxPQUFPLGFBQWE7Ozs7OztJQTJFeEIsWUFDVSxVQUFzQyxFQUN0QyxNQUFjLEVBQ2QsUUFBbUI7UUFGbkIsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7UUFDdEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUE1RXJCLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQU8sSUFBSSxDQUFDLENBQUM7UUFNL0MsV0FBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFJbEIsYUFBUSxHQUFtQixPQUFPLENBQUM7O1FBbUJsQyxhQUFRLEdBQUcsbUJBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQXNCLENBQUM7O1FBR3BGLGlCQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxlQUFl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QkFDTixNQUFNOzRCQUNOLE1BQU07d0JBQ04sTUFBTTs4QkFHTixNQUFNOzs7Ozs7O0lBakVQLHFDQUF1RDs7Ozs7SUFNdkQsK0JBQTJCOztJQUUzQixtQ0FBZ0M7O0lBRWhDLGlDQUE0Qzs7SUFFNUMsa0NBQTJCOztJQUUzQixtQ0FBNEI7O0lBRTVCLG9DQUFvQzs7SUFFcEMsbUNBQWtDOztJQUVsQyxvQ0FBbUM7O0lBRW5DLHdDQUFrQzs7SUFFbEMsd0NBQWtDOzs7OztJQUVsQywyQkFBMEQ7O0lBRzFELGlDQUE4Rjs7SUFHOUYscUNBQTBEOztJQUMxRCxvQ0FBd0Q7O0lBQ3hELGlDQUFrRDs7SUFDbEQsa0NBQW9EOztJQUNwRCx1Q0FBOEQ7O0lBQzlELHlDQUFrRTs7SUFDbEUsb0NBQXdEOztJQUN4RCxtQ0FBc0Q7O0lBQ3RELHVDQUE4RDs7SUFDOUQsa0NBQW9EOztJQUNwRCw0Q0FBd0U7O0lBQ3hFLDJDQUFzRTs7SUFDdEUsNENBQXdFOztJQUN4RSw2Q0FBMEU7O0lBQzFFLDJDQUFzRTs7SUFDdEUsMkNBQXNFOztJQUN0RSwwQ0FBb0U7O0lBQ3BFLGtDQUFvRDs7SUFHcEQsc0NBQTREOztJQUM1RCx1Q0FBOEQ7O0lBQzlELDJDQUFzRTs7SUFDdEUsMENBQW9FOztJQUNwRSxvQ0FBd0Q7O0lBQ3hELDJDQUFzRTs7SUFDdEUsb0NBQXdEOztJQUN4RCxvQ0FBd0Q7O0lBQ3hELG9DQUF3RDs7SUFDeEQsc0NBQTREOztJQUM1RCxrQ0FBb0Q7O0lBR3BELHdDQUFnRTs7Ozs7SUFFaEUsc0NBQTJDOzs7OztJQUUzQywrQkFBMkI7Ozs7O0lBRTNCLHFDQUF1Qzs7Ozs7SUFHckMsbUNBQThDOzs7OztJQUM5QywrQkFBc0I7Ozs7O0lBQ3RCLGlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBQbHlyIGZyb20gJ3BseXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlZmF1bHRQbHlyRHJpdmVyIH0gZnJvbSAnLi4vcGx5ci1kcml2ZXIvZGVmYXVsdC1wbHlyLWRyaXZlcic7XG5pbXBvcnQgeyBQbHlyRHJpdmVyIH0gZnJvbSAnLi4vcGx5ci1kcml2ZXIvcGx5ci1kcml2ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwbHlyLCBbcGx5cl0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gIHRlbXBsYXRlVXJsOiAnLi9wbHlyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGx5ci5jb21wb25lbnQuY3NzJ10sXG4gIGV4cG9ydEFzOiAncGx5cidcbn0pXG5leHBvcnQgY2xhc3MgUGx5ckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBwcml2YXRlIHBsYXllckNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGx5cj4obnVsbCk7XG5cbiAgZ2V0IHBsYXllcigpOiBQbHlyIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJDaGFuZ2UuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXZlbnRzID0gbmV3IE1hcCgpO1xuXG4gIEBJbnB1dCgpIHBseXJEcml2ZXI6IFBseXJEcml2ZXI7XG5cbiAgQElucHV0KCkgcGx5clR5cGU6IFBseXIuTWVkaWFUeXBlID0gJ3ZpZGVvJztcblxuICBASW5wdXQoKSBwbHlyVGl0bGU6IHN0cmluZztcblxuICBASW5wdXQoKSBwbHlyUG9zdGVyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGx5clNvdXJjZXM6IFBseXIuU291cmNlW107XG5cbiAgQElucHV0KCkgcGx5clRyYWNrczogUGx5ci5UcmFja1tdO1xuXG4gIEBJbnB1dCgpIHBseXJPcHRpb25zOiBQbHlyLk9wdGlvbnM7XG5cbiAgQElucHV0KCkgcGx5ckNyb3NzT3JpZ2luOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHBseXJQbGF5c0lubGluZTogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCd2JywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgdnI6IEVsZW1lbnRSZWY7XG5cbiAgLy8gbmd4LXBseXIgZXZlbnRzXG4gIEBPdXRwdXQoKSBwbHlySW5pdCA9IHRoaXMucGxheWVyQ2hhbmdlLnBpcGUoZmlsdGVyKHBsYXllciA9PiAhIXBsYXllcikpIGFzIEV2ZW50RW1pdHRlcjxQbHlyPjtcblxuICAvLyBzdGFuZGFyZCBtZWRpYSBldmVudHNcbiAgQE91dHB1dCgpIHBseXJQcm9ncmVzcyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwcm9ncmVzcycpO1xuICBAT3V0cHV0KCkgcGx5clBsYXlpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGxheWluZycpO1xuICBAT3V0cHV0KCkgcGx5clBsYXkgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGxheScpO1xuICBAT3V0cHV0KCkgcGx5clBhdXNlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BhdXNlJyk7XG4gIEBPdXRwdXQoKSBwbHlyVGltZVVwZGF0ZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1ldXBkYXRlJyk7XG4gIEBPdXRwdXQoKSBwbHlyVm9sdW1lQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3ZvbHVtZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5clNlZWtpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc2Vla2luZycpO1xuICBAT3V0cHV0KCkgcGx5clNlZWtlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzZWVrZWQnKTtcbiAgQE91dHB1dCgpIHBseXJSYXRlQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3JhdGVjaGFuZ2UnKTtcbiAgQE91dHB1dCgpIHBseXJFbmRlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbmRlZCcpO1xuICBAT3V0cHV0KCkgcGx5ckVudGVyRnVsbFNjcmVlbiA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbnRlcmZ1bGxzY3JlZW4nKTtcbiAgQE91dHB1dCgpIHBseXJFeGl0RnVsbFNjcmVlbiA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdleGl0ZnVsbHNjcmVlbicpO1xuICBAT3V0cHV0KCkgcGx5ckNhcHRpb25zRW5hYmxlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjYXB0aW9uc2VuYWJsZWQnKTtcbiAgQE91dHB1dCgpIHBseXJDYXB0aW9uc0Rpc2FibGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhcHRpb25zZGlzYWJsZWQnKTtcbiAgQE91dHB1dCgpIHBseXJMYW5ndWFnZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsYW5ndWFnZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckNvbnRyb2xzSGlkZGVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRyb2xzaGlkZGVuJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ29udHJvbHNTaG93biA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjb250cm9sc3Nob3duJyk7XG4gIEBPdXRwdXQoKSBwbHlyUmVhZHkgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVhZHknKTtcblxuICAvLyBIVE1MNSBldmVudHNcbiAgQE91dHB1dCgpIHBseXJMb2FkU3RhcnQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbG9hZHN0YXJ0Jyk7XG4gIEBPdXRwdXQoKSBwbHlyTG9hZGVkRGF0YSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2FkZWRkYXRhJyk7XG4gIEBPdXRwdXQoKSBwbHlyTG9hZGVkTWV0YWRhdGEgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbG9hZGVkbWV0YWRhdGEnKTtcbiAgQE91dHB1dCgpIHBseXJRdWFsaXR5Q2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3F1YWxpdHljaGFuZ2UnKTtcbiAgQE91dHB1dCgpIHBseXJDYW5QbGF5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhbnBsYXknKTtcbiAgQE91dHB1dCgpIHBseXJDYW5QbGF5VGhyb3VnaCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjYW5wbGF5dGhyb3VnaCcpO1xuICBAT3V0cHV0KCkgcGx5clN0YWxsZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc3RhbGxlZCcpO1xuICBAT3V0cHV0KCkgcGx5cldhaXRpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnd2FpdGluZycpO1xuICBAT3V0cHV0KCkgcGx5ckVtcHRpZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZW1wdGllZCcpO1xuICBAT3V0cHV0KCkgcGx5ckN1ZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjdWVjaGFuZ2UnKTtcbiAgQE91dHB1dCgpIHBseXJFcnJvciA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlcnJvcicpO1xuXG4gIC8vIFlvdVR1YmUgZXZlbnRzXG4gIEBPdXRwdXQoKSBwbHlyU3RhdGVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc3RhdGVjaGFuZ2UnKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBkcml2ZXI6IFBseXJEcml2ZXI7XG5cbiAgcHJpdmF0ZSB2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwIGluIGtleW9mIFBseXJDb21wb25lbnRdPzogU2ltcGxlQ2hhbmdlOyB9KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5wbHlySW5pdC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgocGxheWVyOiBQbHlyKSA9PiB7XG4gICAgICBjb25zdCByZWluaXRUcmlnZ2VycyA9IFtjaGFuZ2VzLnBseXJPcHRpb25zLCBjaGFuZ2VzLnBseXJQbGF5c0lubGluZSwgY2hhbmdlcy5wbHlyQ3Jvc3NPcmlnaW5dLmZpbHRlcih0ID0+ICEhdCk7XG5cbiAgICAgIGlmIChyZWluaXRUcmlnZ2Vycy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHJlaW5pdFRyaWdnZXJzLnNvbWUodCA9PiAhdC5maXJzdENoYW5nZSkpIHtcbiAgICAgICAgICB0aGlzLmluaXRQbHlyKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZVBseXJTb3VyY2UocGxheWVyKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbml0UGx5cigpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGx5cihmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKGZvcmNlIHx8ICF0aGlzLnBsYXllcikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcblxuICAgICAgICB0aGlzLmRyaXZlciA9IHRoaXMucGx5ckRyaXZlciB8fCBuZXcgRGVmYXVsdFBseXJEcml2ZXIoKTtcblxuICAgICAgICB0aGlzLmVuc3VyZVZpZGVvRWxlbWVudCgpO1xuXG4gICAgICAgIGNvbnN0IG5ld1BsYXllciA9IHRoaXMuZHJpdmVyLmNyZWF0ZSh7XG4gICAgICAgICAgdmlkZW9FbGVtZW50OiB0aGlzLnZpZGVvRWxlbWVudCxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLnBseXJPcHRpb25zLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBseXJTb3VyY2UobmV3UGxheWVyKTtcblxuICAgICAgICB0aGlzLnBsYXllckNoYW5nZS5uZXh0KG5ld1BsYXllcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBseXJTb3VyY2UocGx5cjogUGx5cikge1xuICAgIHRoaXMuZHJpdmVyLnVwZGF0ZVNvdXJjZSh7XG4gICAgICB2aWRlb0VsZW1lbnQ6IHRoaXMudmlkZW9FbGVtZW50LFxuICAgICAgcGx5cixcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiB0aGlzLnBseXJUeXBlLFxuICAgICAgICB0aXRsZTogdGhpcy5wbHlyVGl0bGUsXG4gICAgICAgIHNvdXJjZXM6IHRoaXMucGx5clNvdXJjZXMsXG4gICAgICAgIHBvc3RlcjogdGhpcy5wbHlyUG9zdGVyLFxuICAgICAgICB0cmFja3M6IHRoaXMucGx5clRyYWNrcyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUzNzA0MTAyLzE5OTA0NTFcbiAgcHJpdmF0ZSBjcmVhdGVMYXp5RXZlbnQ8VCBleHRlbmRzIFBseXIuUGx5ckV2ZW50PihuYW1lOiBQbHlyLlN0YW5kYXJkRXZlbnQgfCBQbHlyLkh0bWw1RXZlbnQgfCBQbHlyLllvdXR1YmVFdmVudCk6IEV2ZW50RW1pdHRlcjxUPiB7XG4gICAgcmV0dXJuIHRoaXMucGx5ckluaXQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB0aGlzLm9uKG5hbWUsIChkYXRhOiBUKSA9PiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChkYXRhKSkpKSlcbiAgICApIGFzIEV2ZW50RW1pdHRlcjxUPjtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveVBsYXllcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgIEFycmF5LmZyb20odGhpcy5ldmVudHMua2V5cygpKS5mb3JFYWNoKG5hbWUgPT4gdGhpcy5vZmYobmFtZSkpO1xuXG4gICAgICB0aGlzLmRyaXZlci5kZXN0cm95KHtcbiAgICAgICAgcGx5cjogdGhpcy5wbGF5ZXIsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGhvc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8vIHRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIGJlY2F1c2UgdGhlIHBseXIgaW5zZXJ0cyBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgZWxlbWVudCBvbiBkZXN0cm95XG4gIC8vIHNvIHdlIGNhdGNoIHRoZSBjbG9uZSBlbGVtZW50IHJpZ2h0IGhlcmUgYW5kIHJldXNlIGl0XG4gIHByaXZhdGUgZW5zdXJlVmlkZW9FbGVtZW50KCkge1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IHRoaXMuaG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcblxuICAgIGlmICh2aWRlb0VsZW1lbnQpIHtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdmlkZW9FbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50LmNvbnRyb2xzID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMucGx5ckNyb3NzT3JpZ2luKSB7XG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBseXJQbGF5c0lubGluZSkge1xuICAgICAgICB0aGlzLnZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuaG9zdEVsZW1lbnQsIHRoaXMudmlkZW9FbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uKG5hbWU6IHN0cmluZywgaGFuZGxlcjogYW55KSB7XG4gICAgdGhpcy5ldmVudHMuc2V0KG5hbWUsIGhhbmRsZXIpO1xuICAgIHRoaXMucGxheWVyLm9uKG5hbWUgYXMgYW55LCBoYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgb2ZmKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMucGxheWVyLm9mZihuYW1lIGFzIGFueSwgdGhpcy5ldmVudHMuZ2V0KG5hbWUpKTtcbiAgICB0aGlzLmV2ZW50cy5kZWxldGUobmFtZSk7XG4gIH1cblxufVxuIl19