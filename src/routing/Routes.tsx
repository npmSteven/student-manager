import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthenticatedRoute } from './AuthenticatedRoute';
import { NotAuthenticatedRoute } from './NotAuthenticatedRoute';

// Pages
import { Classes } from '../pages/classes/Classes';
import { SignIn } from '../pages/signIn/SignIn';
import { SignUp } from '../pages/signUp/SignUp';
import { Meetings } from '../pages/meetings/Meetings';
import { Settings } from '../pages/settings/Settings';
import { Students } from '../pages/students/Students';
import { Tutors } from '../pages/tutors/Tutors';

export const Routes = () => {
  return (
    <Switch>
      <NotAuthenticatedRoute exact path="/signIn" component={SignIn} />
      <NotAuthenticatedRoute exact path="/signUp" component={SignUp} />
      <AuthenticatedRoute exact path="/classes" component={Classes} />
      <AuthenticatedRoute exact path="/meetings" component={Meetings} />
      <AuthenticatedRoute exact path="/settings" component={Settings} />
      <AuthenticatedRoute exact path="/students" component={Students} />
      <AuthenticatedRoute exact path="/tutors" component={Tutors} />
      <Redirect to="/classes" />
    </Switch>
  );
};
