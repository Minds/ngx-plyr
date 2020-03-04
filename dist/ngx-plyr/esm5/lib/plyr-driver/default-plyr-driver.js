/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as Plyr from 'plyr';
var DefaultPlyrDriver = /** @class */ (function () {
    function DefaultPlyrDriver() {
    }
    /**
     * @param {?} params
     * @return {?}
     */
    DefaultPlyrDriver.prototype.create = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return new Plyr(params.videoElement, params.options);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DefaultPlyrDriver.prototype.updateSource = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        params.plyr.source = params.source;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DefaultPlyrDriver.prototype.destroy = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        params.plyr.destroy();
    };
    return DefaultPlyrDriver;
}());
export { DefaultPlyrDriver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1wbHlyLWRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wbHlyLyIsInNvdXJjZXMiOlsibGliL3BseXItZHJpdmVyL2RlZmF1bHQtcGx5ci1kcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRzdCO0lBQUE7SUFjQSxDQUFDOzs7OztJQVpDLGtDQUFNOzs7O0lBQU4sVUFBTyxNQUE4QjtRQUNuQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsd0NBQVk7Ozs7SUFBWixVQUFhLE1BQW9DO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCxtQ0FBTzs7OztJQUFQLFVBQVEsTUFBK0I7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUgsd0JBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBseXIgZnJvbSAncGx5cic7XG5pbXBvcnQgeyBQbHlyRHJpdmVyLCBQbHlyRHJpdmVyQ3JlYXRlUGFyYW1zLCBQbHlyRHJpdmVyRGVzdHJveVBhcmFtcywgUGx5ckRyaXZlclVwZGF0ZVNvdXJjZVBhcmFtcyB9IGZyb20gJy4vcGx5ci1kcml2ZXInO1xuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFBseXJEcml2ZXIgaW1wbGVtZW50cyBQbHlyRHJpdmVyIHtcblxuICBjcmVhdGUocGFyYW1zOiBQbHlyRHJpdmVyQ3JlYXRlUGFyYW1zKSB7XG4gICAgcmV0dXJuIG5ldyBQbHlyKHBhcmFtcy52aWRlb0VsZW1lbnQsIHBhcmFtcy5vcHRpb25zKTtcbiAgfVxuXG4gIHVwZGF0ZVNvdXJjZShwYXJhbXM6IFBseXJEcml2ZXJVcGRhdGVTb3VyY2VQYXJhbXMpIHtcbiAgICBwYXJhbXMucGx5ci5zb3VyY2UgPSBwYXJhbXMuc291cmNlO1xuICB9XG5cbiAgZGVzdHJveShwYXJhbXM6IFBseXJEcml2ZXJEZXN0cm95UGFyYW1zKSB7XG4gICAgcGFyYW1zLnBseXIuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==