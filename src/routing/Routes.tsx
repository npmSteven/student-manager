
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '../pages/notFound/NotFound';

import { SignIn } from '../pages/signIn/SignIn';
import { SignUp } from '../pages/signUp/SignUp';

export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/signIn' component={SignIn} />
            <Route exact path='/signUp' component={SignUp} />
            <Route component={NotFound} />
        </Switch>
    );
};