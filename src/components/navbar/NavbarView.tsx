import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavbarView = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Manager
          </Typography>
          <Button component={Link} to="/meetings" variant="text" className={classes.button}>Meetings</Button>
          <Button component={Link} to="/classes" variant="text" className={classes.button}>Classes</Button>
          <Button component={Link} to="/tutors" variant="text" className={classes.button}>Tutors</Button>
          <Button component={Link} to="/students" variant="text" className={classes.button}>Students</Button>
          <Button component={Link} to="/logout" variant="text" className={classes.button}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
