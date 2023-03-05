import {
    MoreVert as MoreVertIcon,
    FiberManualRecordOutlined as FiberManualRecordOutlinedIcon,
  } from '@mui/icons-material';
  import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

  type CounterProps = {
    count: number;
  }

export const IconGroup = ({ count }: CounterProps) => {
    const icons = Array(count).fill(
      <MoreVertIcon fontSize='small' style={{ fontSize: '20px' }} />,
    );
    return (
      <>
        <FiberManualRecordOutlinedIcon />
        {icons.map((icon, index) => (
          <div key={index}>{icon}</div>
        ))}
        <LocationOnOutlinedIcon color='error' />
      </>
    );
  };