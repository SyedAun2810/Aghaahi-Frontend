import { Switch, Route } from "react-router-dom";
import EmployeeList from "@Components/EmployeeList/EmployeeList";
// ...other imports...

const AuthenticatedRoutes = () => {
    return (
        <Switch>
            {/* ...existing routes... */}
            <Route path="/employees" component={EmployeeList} />
            {/* ...existing routes... */}
        </Switch>
    );
};

export default AuthenticatedRoutes;