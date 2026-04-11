import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const AppSwitch = styled(Switch)(() => ({
  width: 52,
  height: 28,
  padding: 6,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(4px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(18px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#fcd34d',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#f59e0b',
    width: 24,
    height: 24,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#fcd34d',
    borderRadius: 20 / 2,
  },
}));

export default AppSwitch;
