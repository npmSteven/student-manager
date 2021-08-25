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
import { Logout } from '../pages/logout/Logout';
import { ClassesEdit } from '../pages/classes/classesEdit/ClassesEdit';
import { ClassesAdd } from '../pages/classes/classesAdd/ClassesAdd';
import { ClassesRead } from '../pages/classes/classesRead/ClassesRead';
import { MeetingsAdd } from '../pages/meetings/meetingsAdd/MeetingsAdd';
import { MeetingsEdit } from '../pages/meetings/meetingsEdit/MeetingsEdit';
import { MeetingsRead } from '../pages/meetings/meetingsRead/MeetingsRead';
import { StudentsEdit } from '../pages/students/studentsEdit/StudentsEdit';
import { StudentsRead } from '../pages/students/studentsRead/StudentsRead';
import { StudentsAdd } from '../pages/students/studentsAdd/StudentsAdd';
import { TutorsRead } from '../pages/tutors/tutorsRead/TutorsRead';
import { TutorsAddEdit } from '../pages/tutors/tutorsAddEdit/TutorsAddEdit';

export const Routes = () => {
  return (
    <Switch>
      <NotAuthenticatedRoute exact path="/signIn" component={SignIn} />
      <NotAuthenticatedRoute exact path="/signUp" component={SignUp} />
      {/* Classes */}
      <AuthenticatedRoute exact path="/classes" component={Classes} />
      <AuthenticatedRoute exact path="/classes/edit/:id" component={ClassesEdit} />
      <AuthenticatedRoute exact path="/classes/read/:id" component={ClassesRead} />
      <AuthenticatedRoute exact path="/classes/add" component={ClassesAdd} />

      {/* Meetings */}
      <AuthenticatedRoute exact path="/meetings" component={Meetings} />
      <AuthenticatedRoute exact path="/meetings/edit/:id" component={MeetingsEdit} />
      <AuthenticatedRoute exact path="/meetings/read/:id" component={MeetingsRead} />
      <AuthenticatedRoute exact path="/meetings/add" component={MeetingsAdd} />

      {/* Students */}
      <AuthenticatedRoute exact path="/students" component={Students} />
      <AuthenticatedRoute exact path="/students/edit/:id" component={StudentsEdit} />
      <AuthenticatedRoute exact path="/students/read/:id" component={StudentsRead} />
      <AuthenticatedRoute exact path="/students/add" component={StudentsAdd} />

      {/* Tutors */}
      <AuthenticatedRoute exact path="/tutors" component={Tutors} />
      <AuthenticatedRoute exact path="/tutors/read/:id" component={TutorsRead} />
      <AuthenticatedRoute exact path="/tutors/add" component={TutorsAddEdit} />
      <AuthenticatedRoute exact path="/tutors/edit/:id" component={TutorsAddEdit} />

      <AuthenticatedRoute exact path="/settings" component={Settings} />
      
      <Route exact path="/logout" component={Logout} />

      <Redirect to="/classes" />
    </Switch>
  );
};
