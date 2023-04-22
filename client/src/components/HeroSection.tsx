import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CustomButton from './CustomButton';

function HeroSection(): JSX.Element {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: '#000336',
    fontWeight: 'bold',
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
    },
  }));


  return (
    <>
      <Box
        sx={{
          backgroundColor: '#E6F0FF',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <CustomBox>
            <Box sx={{ flex: '1' }}>
              <Title variant="h1">Welcome to InvestShare</Title>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '30px',
                  color: '#687690',
                  fontWeight: 'bold',
                  // mt: 10,
                  mb: 4,
                }}
              >
                Discover how your friends are investing and become more
                financially literate - together.
              </Typography>
              {/* CustomButton doesn't have an onClick */}
              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="More About Us"
                heroBtn={true}
                hoverBgColor="#E6F0FF"
              />
            </Box>
            <Box sx={{ flex: '1.25' }}>
              <img
                src="/images/hero-image-2.png"
                alt="heroImg"
                style={{ maxWidth: '100%' }}
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </>
  );
}

export default HeroSection;
