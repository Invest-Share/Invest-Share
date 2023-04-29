import { Button, styled } from '@mui/material';

// type all properties this component should expect to have
interface CustomButtonProps {
  backgroundColor: string;
  color: string;
  buttonText: string;
  heroBtn?: boolean;
  guideBtn?: boolean;
  getStartedBtn?: boolean;
  hoverBgColor?: string;
}

// FC = FunctionComponent
// props CustomButton component receives must match interface CustomButtonProps
const CustomButton: React.FC<CustomButtonProps> = ({
  backgroundColor,
  color,
  buttonText,
  heroBtn,
  guideBtn,
  getStartedBtn,
  hoverBgColor,
}): JSX.Element => {
  // this is a custom component that extends MUI Button using styles() utility
  // to customize style, add prop OR define new property on default MUI theme
  // { theme } = props, used for responsive design
  // no need to make an interface for theme unless you're using a custom theme; only using default theme config vars (breakpoints, spacing)
  const CustomButton = styled(Button)(({ theme }) => ({
    // custom CSS
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0.5rem 1.25rem',
    borderRadius: '7px',
    textTransform: 'none',
    display: 'block',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: hoverBgColor,
      color: backgroundColor,
      borderColor: backgroundColor,
    },
    // interfaces adapt layouts at specified breakpoints to make components responsive
    // if screen width < 900px
    [theme.breakpoints.down('md')]: {
      // if button is heroBtn or getStartedBtn, this is the margin spacing and width button should have
      margin: (heroBtn || getStartedBtn) && theme.spacing('auto'),
      width: (heroBtn || getStartedBtn) && '90%',
    },
    // if screen width < 600px
    [theme.breakpoints.down('sm')]: {
      // if button is guideBtn, this is the top margin spacing and width button should have
      marginTop: guideBtn && theme.spacing(3),
      width: guideBtn && '90%',
    },
  }));

  return <CustomButton>{buttonText}</CustomButton>;
};

export default CustomButton;
