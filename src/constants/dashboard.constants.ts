export const arrayOfDashboardItems = ["dashboard", "add-new-graph", "add-new-employee","employee-listing", 
    "employee-detail", "employee", "edit-profile","role-management" ,"faq", "about-us", "privacy-policy", "contact-us"];

export const hideHeaderRoutes = ["faq", "about-us", "contact-us", "privacy-policy"];

export function CheckRoute(route: string[]) {
    for (let i = 0; i < arrayOfDashboardItems.length; i++) {
        if (route[1] === arrayOfDashboardItems[i]) {
            return true;
        }
    }
}

export function shouldHideHeader(route: string[]): boolean {
    // If route is empty or undefined, show header
    if (!route || route.length === 0) {
        return false;
    }
    
    // Check if it's a static route (no dynamic parameters)
    const isStaticRoute = !route[1].includes(':') && !route[1].includes('[') && !route[1].includes(']');
    
    // Hide header for static routes in hideHeaderRoutes
    return isStaticRoute && hideHeaderRoutes.includes(route[1]);
}