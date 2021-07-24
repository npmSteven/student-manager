import { CircularProgress } from '@material-ui/core';

export const Loader = ({ component, isLoading }: any) => {
  const Loading = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={80} />
    </div>
  );

  return isLoading ? <Loading /> : component;
};
