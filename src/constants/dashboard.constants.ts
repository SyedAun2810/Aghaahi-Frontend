export const arrayOfDashboardItems = ["dashboard", "add-new-graph", "add-new-employee","employee-listing", "employee-detail", "employee", "edit-profile" ];

export function CheckRoute(route: string[]) {
    for (let i = 0; i < arrayOfDashboardItems.length; i++) {
        if (route[1] === arrayOfDashboardItems[i]) {
            return true;
        }
    }
}