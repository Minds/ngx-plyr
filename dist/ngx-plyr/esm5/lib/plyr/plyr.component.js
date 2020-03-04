/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import * as Plyr from 'plyr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DefaultPlyrDriver } from '../plyr-driver/default-plyr-driver';
var PlyrComponent = /** @class */ (function () {
    function PlyrComponent(elementRef, ngZone, renderer) {
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
        function (player) { return !!player; })))));
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
    Object.defineProperty(PlyrComponent.prototype, "player", {
        get: /**
         * @return {?}
         */
        function () {
            return this.playerChange.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    PlyrComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this.subscriptions.push(this.plyrInit.pipe(first()).subscribe((/**
         * @param {?} player
         * @return {?}
         */
        function (player) {
            /** @type {?} */
            var reinitTriggers = [changes.plyrOptions, changes.plyrPlaysInline, changes.plyrCrossOrigin].filter((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return !!t; }));
            if (reinitTriggers.length) {
                if (reinitTriggers.some((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return !t.firstChange; }))) {
                    _this.initPlyr(true);
                }
            }
            else {
                _this.updatePlyrSource(player);
            }
        })));
    };
    /**
     * @return {?}
     */
    PlyrComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyPlayer();
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    PlyrComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initPlyr();
    };
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    PlyrComponent.prototype.initPlyr = /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force || !this.player) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.destroyPlayer();
                _this.driver = _this.plyrDriver || new DefaultPlyrDriver();
                _this.ensureVideoElement();
                /** @type {?} */
                var newPlayer = _this.driver.create({
                    videoElement: _this.videoElement,
                    options: _this.plyrOptions,
                });
                _this.updatePlyrSource(newPlayer);
                _this.playerChange.next(newPlayer);
            }));
        }
    };
    /**
     * @private
     * @param {?} plyr
     * @return {?}
     */
    PlyrComponent.prototype.updatePlyrSource = /**
     * @private
     * @param {?} plyr
     * @return {?}
     */
    function (plyr) {
        this.driver.updateSource({
            videoElement: this.videoElement,
            plyr: plyr,
            source: {
                type: this.plyrType,
                title: this.plyrTitle,
                sources: this.plyrSources,
                poster: this.plyrPoster,
                tracks: this.plyrTracks,
            },
        });
    };
    // see https://stackoverflow.com/a/53704102/1990451
    // see https://stackoverflow.com/a/53704102/1990451
    /**
     * @private
     * @template T
     * @param {?} name
     * @return {?}
     */
    PlyrComponent.prototype.createLazyEvent = 
    // see https://stackoverflow.com/a/53704102/1990451
    /**
     * @private
     * @template T
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        return (/** @type {?} */ (this.plyrInit.pipe(switchMap((/**
         * @return {?}
         */
        function () { return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) { return _this.on(name, (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return observer.next(data); })); })); })); })))));
    };
    /**
     * @private
     * @return {?}
     */
    PlyrComponent.prototype.destroyPlayer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.player) {
            Array.from(this.events.keys()).forEach((/**
             * @param {?} name
             * @return {?}
             */
            function (name) { return _this.off(name); }));
            this.driver.destroy({
                plyr: this.player,
            });
            this.videoElement = null;
        }
    };
    Object.defineProperty(PlyrComponent.prototype, "hostElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    /**
     * @private
     * @return {?}
     */
    PlyrComponent.prototype.ensureVideoElement = 
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var videoElement = this.hostElement.querySelector('video');
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
    };
    /**
     * @private
     * @param {?} name
     * @param {?} handler
     * @return {?}
     */
    PlyrComponent.prototype.on = /**
     * @private
     * @param {?} name
     * @param {?} handler
     * @return {?}
     */
    function (name, handler) {
        this.events.set(name, handler);
        this.player.on((/** @type {?} */ (name)), handler);
    };
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    PlyrComponent.prototype.off = /**
     * @private
     * @param {?} name
     * @return {?}
     */
    function (name) {
        this.player.off((/** @type {?} */ (name)), this.events.get(name));
        this.events.delete(name);
    };
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
    PlyrComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
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
    return PlyrComponent;
}());
export { PlyrComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx5ci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGx5ci8iLCJzb3VyY2VzIjpbImxpYi9wbHlyL3BseXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQWdCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHdkU7SUFpRkUsdUJBQ1UsVUFBc0MsRUFDdEMsTUFBYyxFQUNkLFFBQW1CO1FBRm5CLGVBQVUsR0FBVixVQUFVLENBQTRCO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBNUVyQixpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFPLElBQUksQ0FBQyxDQUFDO1FBTS9DLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBSWxCLGFBQVEsR0FBbUIsT0FBTyxDQUFDOztRQW1CbEMsYUFBUSxHQUFHLG1CQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEVBQVIsQ0FBUSxFQUFDLENBQUMsRUFBc0IsQ0FBQzs7UUFHcEYsaUJBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELGdCQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFT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b0NBQXdEOztJQUN4RCxvQ0FBd0Q7O0lBQ3hELG9DQUF3RDs7SUFDeEQsc0NBQTREOztJQUM1RCxrQ0FBb0Q7O0lBR3BELHdDQUFnRTs7Ozs7SUFFaEUsc0NBQTJDOzs7OztJQUUzQywrQkFBMkI7Ozs7O0lBRTNCLHFDQUF1Qzs7Ozs7SUFHckMsbUNBQThDOzs7OztJQUM5QywrQkFBc0I7Ozs7O0lBQ3RCLGlDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBQbHlyIGZyb20gJ3BseXInO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlZmF1bHRQbHlyRHJpdmVyIH0gZnJvbSAnLi4vcGx5ci1kcml2ZXIvZGVmYXVsdC1wbHlyLWRyaXZlcic7XG5pbXBvcnQgeyBQbHlyRHJpdmVyIH0gZnJvbSAnLi4vcGx5ci1kcml2ZXIvcGx5ci1kcml2ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwbHlyLCBbcGx5cl0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gIHRlbXBsYXRlVXJsOiAnLi9wbHlyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGx5ci5jb21wb25lbnQuY3NzJ10sXG4gIGV4cG9ydEFzOiAncGx5cidcbn0pXG5leHBvcnQgY2xhc3MgUGx5ckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBwcml2YXRlIHBsYXllckNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGx5cj4obnVsbCk7XG5cbiAgZ2V0IHBsYXllcigpOiBQbHlyIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJDaGFuZ2UuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXZlbnRzID0gbmV3IE1hcCgpO1xuXG4gIEBJbnB1dCgpIHBseXJEcml2ZXI6IFBseXJEcml2ZXI7XG5cbiAgQElucHV0KCkgcGx5clR5cGU6IFBseXIuTWVkaWFUeXBlID0gJ3ZpZGVvJztcblxuICBASW5wdXQoKSBwbHlyVGl0bGU6IHN0cmluZztcblxuICBASW5wdXQoKSBwbHlyUG9zdGVyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGx5clNvdXJjZXM6IFBseXIuU291cmNlW107XG5cbiAgQElucHV0KCkgcGx5clRyYWNrczogUGx5ci5UcmFja1tdO1xuXG4gIEBJbnB1dCgpIHBseXJPcHRpb25zOiBQbHlyLk9wdGlvbnM7XG5cbiAgQElucHV0KCkgcGx5ckNyb3NzT3JpZ2luOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHBseXJQbGF5c0lubGluZTogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCd2JywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgdnI6IEVsZW1lbnRSZWY7XG5cbiAgLy8gbmd4LXBseXIgZXZlbnRzXG4gIEBPdXRwdXQoKSBwbHlySW5pdCA9IHRoaXMucGxheWVyQ2hhbmdlLnBpcGUoZmlsdGVyKHBsYXllciA9PiAhIXBsYXllcikpIGFzIEV2ZW50RW1pdHRlcjxQbHlyPjtcblxuICAvLyBzdGFuZGFyZCBtZWRpYSBldmVudHNcbiAgQE91dHB1dCgpIHBseXJQcm9ncmVzcyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwcm9ncmVzcycpO1xuICBAT3V0cHV0KCkgcGx5clBsYXlpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGxheWluZycpO1xuICBAT3V0cHV0KCkgcGx5clBsYXkgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGxheScpO1xuICBAT3V0cHV0KCkgcGx5clBhdXNlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BhdXNlJyk7XG4gIEBPdXRwdXQoKSBwbHlyVGltZVVwZGF0ZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1ldXBkYXRlJyk7XG4gIEBPdXRwdXQoKSBwbHlyVm9sdW1lQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3ZvbHVtZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5clNlZWtpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc2Vla2luZycpO1xuICBAT3V0cHV0KCkgcGx5clNlZWtlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzZWVrZWQnKTtcbiAgQE91dHB1dCgpIHBseXJSYXRlQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3JhdGVjaGFuZ2UnKTtcbiAgQE91dHB1dCgpIHBseXJFbmRlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbmRlZCcpO1xuICBAT3V0cHV0KCkgcGx5ckVudGVyRnVsbFNjcmVlbiA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbnRlcmZ1bGxzY3JlZW4nKTtcbiAgQE91dHB1dCgpIHBseXJFeGl0RnVsbFNjcmVlbiA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdleGl0ZnVsbHNjcmVlbicpO1xuICBAT3V0cHV0KCkgcGx5ckNhcHRpb25zRW5hYmxlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjYXB0aW9uc2VuYWJsZWQnKTtcbiAgQE91dHB1dCgpIHBseXJDYXB0aW9uc0Rpc2FibGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhcHRpb25zZGlzYWJsZWQnKTtcbiAgQE91dHB1dCgpIHBseXJMYW5ndWFnZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsYW5ndWFnZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckNvbnRyb2xzSGlkZGVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRyb2xzaGlkZGVuJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ29udHJvbHNTaG93biA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjb250cm9sc3Nob3duJyk7XG4gIEBPdXRwdXQoKSBwbHlyUmVhZHkgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVhZHknKTtcblxuICAvLyBIVE1MNSBldmVudHNcbiAgQE91dHB1dCgpIHBseXJMb2FkU3RhcnQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbG9hZHN0YXJ0Jyk7XG4gIEBPdXRwdXQoKSBwbHlyTG9hZGVkRGF0YSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2FkZWRkYXRhJyk7XG4gIEBPdXRwdXQoKSBwbHlyTG9hZGVkTWV0YWRhdGEgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbG9hZGVkbWV0YWRhdGEnKTtcbiAgQE91dHB1dCgpIHBseXJRdWFsaXR5Q2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3F1YWxpdHljaGFuZ2UnKTtcbiAgQE91dHB1dCgpIHBseXJDYW5QbGF5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhbnBsYXknKTtcbiAgQE91dHB1dCgpIHBseXJDYW5QbGF5VGhyb3VnaCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjYW5wbGF5dGhyb3VnaCcpO1xuICBAT3V0cHV0KCkgcGx5clN0YWxsZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc3RhbGxlZCcpO1xuICBAT3V0cHV0KCkgcGx5cldhaXRpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnd2FpdGluZycpO1xuICBAT3V0cHV0KCkgcGx5ckVtcHRpZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZW1wdGllZCcpO1xuICBAT3V0cHV0KCkgcGx5ckN1ZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjdWVjaGFuZ2UnKTtcbiAgQE91dHB1dCgpIHBseXJFcnJvciA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlcnJvcicpO1xuXG4gIC8vIFlvdVR1YmUgZXZlbnRzXG4gIEBPdXRwdXQoKSBwbHlyU3RhdGVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc3RhdGVjaGFuZ2UnKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBkcml2ZXI6IFBseXJEcml2ZXI7XG5cbiAgcHJpdmF0ZSB2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwIGluIGtleW9mIFBseXJDb21wb25lbnRdPzogU2ltcGxlQ2hhbmdlOyB9KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5wbHlySW5pdC5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgocGxheWVyOiBQbHlyKSA9PiB7XG4gICAgICBjb25zdCByZWluaXRUcmlnZ2VycyA9IFtjaGFuZ2VzLnBseXJPcHRpb25zLCBjaGFuZ2VzLnBseXJQbGF5c0lubGluZSwgY2hhbmdlcy5wbHlyQ3Jvc3NPcmlnaW5dLmZpbHRlcih0ID0+ICEhdCk7XG5cbiAgICAgIGlmIChyZWluaXRUcmlnZ2Vycy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHJlaW5pdFRyaWdnZXJzLnNvbWUodCA9PiAhdC5maXJzdENoYW5nZSkpIHtcbiAgICAgICAgICB0aGlzLmluaXRQbHlyKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZVBseXJTb3VyY2UocGxheWVyKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbml0UGx5cigpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGx5cihmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKGZvcmNlIHx8ICF0aGlzLnBsYXllcikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcblxuICAgICAgICB0aGlzLmRyaXZlciA9IHRoaXMucGx5ckRyaXZlciB8fCBuZXcgRGVmYXVsdFBseXJEcml2ZXIoKTtcblxuICAgICAgICB0aGlzLmVuc3VyZVZpZGVvRWxlbWVudCgpO1xuXG4gICAgICAgIGNvbnN0IG5ld1BsYXllciA9IHRoaXMuZHJpdmVyLmNyZWF0ZSh7XG4gICAgICAgICAgdmlkZW9FbGVtZW50OiB0aGlzLnZpZGVvRWxlbWVudCxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLnBseXJPcHRpb25zLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBseXJTb3VyY2UobmV3UGxheWVyKTtcblxuICAgICAgICB0aGlzLnBsYXllckNoYW5nZS5uZXh0KG5ld1BsYXllcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBseXJTb3VyY2UocGx5cjogUGx5cikge1xuICAgIHRoaXMuZHJpdmVyLnVwZGF0ZVNvdXJjZSh7XG4gICAgICB2aWRlb0VsZW1lbnQ6IHRoaXMudmlkZW9FbGVtZW50LFxuICAgICAgcGx5cixcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlOiB0aGlzLnBseXJUeXBlLFxuICAgICAgICB0aXRsZTogdGhpcy5wbHlyVGl0bGUsXG4gICAgICAgIHNvdXJjZXM6IHRoaXMucGx5clNvdXJjZXMsXG4gICAgICAgIHBvc3RlcjogdGhpcy5wbHlyUG9zdGVyLFxuICAgICAgICB0cmFja3M6IHRoaXMucGx5clRyYWNrcyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUzNzA0MTAyLzE5OTA0NTFcbiAgcHJpdmF0ZSBjcmVhdGVMYXp5RXZlbnQ8VCBleHRlbmRzIFBseXIuUGx5ckV2ZW50PihuYW1lOiBQbHlyLlN0YW5kYXJkRXZlbnQgfCBQbHlyLkh0bWw1RXZlbnQgfCBQbHlyLllvdXR1YmVFdmVudCk6IEV2ZW50RW1pdHRlcjxUPiB7XG4gICAgcmV0dXJuIHRoaXMucGx5ckluaXQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB0aGlzLm9uKG5hbWUsIChkYXRhOiBUKSA9PiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChkYXRhKSkpKSlcbiAgICApIGFzIEV2ZW50RW1pdHRlcjxUPjtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveVBsYXllcigpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgIEFycmF5LmZyb20odGhpcy5ldmVudHMua2V5cygpKS5mb3JFYWNoKG5hbWUgPT4gdGhpcy5vZmYobmFtZSkpO1xuXG4gICAgICB0aGlzLmRyaXZlci5kZXN0cm95KHtcbiAgICAgICAgcGx5cjogdGhpcy5wbGF5ZXIsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGhvc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8vIHRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIGJlY2F1c2UgdGhlIHBseXIgaW5zZXJ0cyBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgZWxlbWVudCBvbiBkZXN0cm95XG4gIC8vIHNvIHdlIGNhdGNoIHRoZSBjbG9uZSBlbGVtZW50IHJpZ2h0IGhlcmUgYW5kIHJldXNlIGl0XG4gIHByaXZhdGUgZW5zdXJlVmlkZW9FbGVtZW50KCkge1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IHRoaXMuaG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcblxuICAgIGlmICh2aWRlb0VsZW1lbnQpIHtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdmlkZW9FbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50LmNvbnRyb2xzID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMucGx5ckNyb3NzT3JpZ2luKSB7XG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBseXJQbGF5c0lubGluZSkge1xuICAgICAgICB0aGlzLnZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuaG9zdEVsZW1lbnQsIHRoaXMudmlkZW9FbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uKG5hbWU6IHN0cmluZywgaGFuZGxlcjogYW55KSB7XG4gICAgdGhpcy5ldmVudHMuc2V0KG5hbWUsIGhhbmRsZXIpO1xuICAgIHRoaXMucGxheWVyLm9uKG5hbWUgYXMgYW55LCBoYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgb2ZmKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMucGxheWVyLm9mZihuYW1lIGFzIGFueSwgdGhpcy5ldmVudHMuZ2V0KG5hbWUpKTtcbiAgICB0aGlzLmV2ZW50cy5kZWxldGUobmFtZSk7XG4gIH1cblxufVxuIl19