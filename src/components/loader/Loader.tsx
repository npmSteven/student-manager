import { CircularProgress } from '@material-ui/core';

export const Loader = ({ component, isLoading }: any) => {
  const Loading = () => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <CircularProgress size={80} />
    </div>
  );

  return isLoading ? <Loading /> : component;
};
