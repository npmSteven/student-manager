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
  menuButton: {
    marginRight: theme.spacing(2),
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
          <Button component={Link} to="/meetings" variant="text" style={{ color: 'white' }}>Meetings</Button>
          <Button component={Link} to="/classes" variant="text" style={{ color: 'white' }}>Classes</Button>
          <Button component={Link} to="/tutors" variant="text" style={{ color: 'white' }}>Tutors</Button>
          <Button component={Link} to="/students" variant="text" style={{ color: 'white' }}>Students</Button>
          <Button component={Link} to="/logout" variant="text" style={{ color: 'white' }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
