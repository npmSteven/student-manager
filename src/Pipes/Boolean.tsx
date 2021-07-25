import { Icon } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';

export const Boolean = ({ has }: any) => {
  return has ? <Icon component={Check} /> : <Icon component={Clear} />
};
