import { toast } from 'react-toastify';

export const showPopup = (content) =>
  toast(content, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
