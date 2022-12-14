// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery, Stack } from '@mui/material';
import { MHidden } from 'components/@material-extend';
//
import { useTranslation } from 'react-i18next';
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

// const CARDS = [
//   {
//     icon: '/static/icons/ic_customer.svg',
//     title: (
//       <>
//         Reso <br /> Direct-to-Consumer
//       </>
//     ),
//     description:
//       'Allow your brand to offer your customers a personalised buying experience. Go D2C and add a new distribution channel for your brand.'
//   },
//   {
//     icon: '/static/icons/ic_store.svg',
//     title: (
//       <>
//         Reso <br /> Hyperlocal Marketplace
//       </>
//     ),
//     description:
//       'Leverage your business with a hyperlocal marketplace platform and focus on your target audience, ensuring on-time delivery.'
//   },
//   {
//     icon: '/static/icons/ic_headless.svg',
//     title: (
//       <>
//         Reso <br /> Headless Commerce
//       </>
//     ),
//     description:
//       'Scale your business with an event-driven platform. Build your own front-end and enhance your business without worrying about the infrastructure.'
//   }
// ];

// const shadowIcon = (color: string) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

type Feature = {
  icon: string;
  title: string;
  description: string;
  caption: string;
};

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const { icon, title, description, caption } = feature;

  return (
    <Card
      sx={{
        zIndex: 1,
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(
            isLight ? theme.palette.grey[500] : theme.palette.common.black,
            0.12
          )}`,
      }}
    >
      <Stack spacing={5}>
        <Box
          component="img"
          src={icon}
          sx={{
            width: 64,
            height: 64,
            // bgcolor: 'info.main',
            // p: 1,
            // borderRadius: 64,
            // color: 'white'
          }}
        />
        <Typography variant="h4">{title}</Typography>

        <Stack spacing={2.5}>
          <Typography variant="h6" color="text.secondary">
            {description}
          </Typography>
          <Typography color="text.secondary">{caption}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default function LandingWhitePlatform() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation();
  const features = [
    {
      icon: '/static/icons/ic_responsive.svg',
      title: 'T??y ch???nh v???i nhi???u ????? t??i',
      description:
        'Kh??ng c???n lo v??? t????ng th??ch nhi???u ph????ng ti???n v?? t???p trung v??o th????ng hi???u c???a b???n.',
      caption:
        'T???o giao di???n ?????c ????o cho th????ng hi???u c???a b???n b???ng c??c ch??? ????? t??y ch???nh, ????p ???ng t???t c??? thi???t b??? ho???c s??? d???ng giao di???n th????ng hi???u hi???n c?? c???a b???n ????? n???i b???t so v???i c??c ?????i th??? c???nh tranh.',
    },
    {
      icon: '/static/icons/ic_customer.png',
      title: 'H??? tr??? kh??ch h??ng',
      description: '?????m b???o vi???c giao ti???p ??? th???i gian th???c v???i kh??ch h??ng',
      caption: `T????ng t??c v???i kh??ch h??ng c???a b???n b???ng c??ch s??? d???ng chatbot t??ch h???p c???a Reso. C???i thi???n s??? h??i l??ng c???a kh??ch h??ng b???ng c??ch gi???m th???i gian ch??? ?????i v?? chi ph?? ho???t ?????ng v???i m???t n???n t???ng tr?? chuy???n ph?? h???p t???i ch???.`,
    },
    {
      icon: '/static/icons/ic_delivery.gif',
      title: t('ldPage.delivery'),
      description: t('ldPage.deliveryTitle'),
      caption: t('ldPage.deliverySupport'),
    },
    {
      icon: '/static/icons/stores.svg',
      title: t('ldPage.chain'),
      description: t('ldPage.chainTitle'),
      caption: t('ldPage.chainSub'),
    },
  ];
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 24 }, textAlign: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>
              {t('ldPage.benefit')}
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h4"
              sx={{
                color: isLight ? 'text.secondary' : 'text.primary',
              }}
            >
              {t('ldPage.subBenefit')}
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInDown}>
              <Stack spacing={4}>
                <FeatureCard feature={features[0]} />
                {/* <FeatureCard feature={features[1]} /> */}
              </Stack>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4} position="relative" alignSelf="flex-start">
            <MHidden width="lgDown">
              <MotionInView variants={varFadeInUp}>
                <Box
                  position="absolute"
                  top="-150px"
                  component="img"
                  src="/static/home/SiteStatsAmico.svg"
                  sx={{
                    width: 540,
                    zIndex: 0,
                    maxWidth: 'unset',
                    left: '50%',
                    transform: 'translate(-50%,0)',
                  }}
                />
              </MotionInView>
            </MHidden>
            <MotionInView marginTop={isDesktop ? 10 : 0} variants={varFadeInUp}>
              <FeatureCard feature={features[2]} />
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionInView variants={varFadeInDown}>
              <Stack spacing={4}>
                <FeatureCard feature={features[3]} />
              </Stack>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
