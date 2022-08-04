import { Notyf } from 'notyf';
export const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
  dismissible: true,
  ripple: true,
  types: [
    {
      type: 'error',
      background: '#c34249',
      duration: 2000,
      dismissible: true,
    },
  ],
});

export const handleServerErrors = (error: any) => {
  if (error.response.status === 418) {
    error.response.data.errors.forEach((error: any) => {
      notyf.error(error.message);
    });
  } else {
    notyf.error(error.response.data.msg);
  }
};
