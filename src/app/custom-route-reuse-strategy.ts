import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    handlers: { [key: string]: DetachedRouteHandle } = {};

    /** Determines if this route (and its subtree) should be detached to be reused later */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log(route)
        if (route.url.length > 0) {
            if (route.url[0].path! == "login" || route.url[0].path! == "configure") {
                console.log("Route will not be reused")
                return false
            }
        }
        return true;
    }

    /** Stores the detached route */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handlers[route.routeConfig!.path!] = handle;
    }

    /** Determines if this route (and its subtree) should be reattached */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path!];
    }

    /** Retrieves the previously stored route */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path!];
    }

    /** Determines if a route should be reused */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }


}