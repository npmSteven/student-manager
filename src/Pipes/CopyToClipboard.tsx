import { CopyToClipboard as CtC } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

export const CopyToClipboard = ({ text }: any) => {

  const alertSuccessCopy = () => {
    toast.dismiss();
    toast.success('Copied to clipboard');
  }

  return <CtC text={text} onCopy={alertSuccessCopy}><p style={{ cursor: 'pointer' }}>{text}</p></CtC>;
};
