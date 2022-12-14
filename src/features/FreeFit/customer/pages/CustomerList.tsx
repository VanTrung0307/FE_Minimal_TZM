import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
// material
import storeApi from 'api/storeApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
// @types
// components
import Page from 'components/Page';
// hooks
import useSettings from 'hooks/useSettings';
import { GetStatusMap, Store } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// redux
// routes
import { Visibility } from '@mui/icons-material';
import ResoTable from 'components/table/ResoTable';
import { TTableColumn } from 'components/table/table';
import { PATH_DASHBOARD } from 'routes/paths';
import { Club } from 'models/freefit/club';
import { Registration } from 'models/freefit/customer';
import { fDate, fDateTimeSuffix2 } from 'utils/formatTime';
import customerApi from 'api/FreeFitApi/customerApi';
import { selectBrandTypeOptions, selectFilter, storeActions } from '../storeSlice';

export default function CustomerList() {
  const { themeStretch } = useSettings();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [storeSelected, setStoreSelected] = useState<Store>();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const { statusMap } = GetStatusMap();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const ref = useRef<any>(null);
  const navigate = useNavigate();
  const formMethod = useForm<any>();
  const brandTypeOptions = useAppSelector(selectBrandTypeOptions);

  useEffect(() => {
    dispatch(storeActions.fetchBrandType());
    dispatch(storeActions.fetchProvince());
  }, [dispatch, filter]);

  const handelRemoveClick = (store: Store) => {
    setStoreSelected(store);
    setConfirmDelete(true);
  };
  const handelConfirmRemoveClick = async () => {
    try {
      await storeApi.remove(storeSelected?.id || 0);
      const newFilter = { ...filter };
      dispatch(storeActions.setFilter(newFilter));
      enqueueSnackbar(`${storeSelected?.name} ${t('store.deleteSuccess')}`, { variant: 'success' });

      setStoreSelected(undefined);
      setConfirmDelete(false);
    } catch (error) {
      enqueueSnackbar(`${storeSelected?.name} ${t('common.errorText')}`, { variant: 'error' });
    }
  };

  const brandOptions = brandTypeOptions.map((c) => ({ label: c.name, value: c.id }));

  const [name, setName] = useState<any>(null);
  const handleChange = (event: any, newValue: any) => {
    setName(newValue);
  };

  useEffect(() => {
    if (name === null) {
      ref.current.formControl.setValue('SearchBy', '');
      ref.current.formControl.setValue('KeySearch', '');
    }
    if (ref.current && name) {
      ref.current.formControl.setValue('SearchBy', 'name');
      ref.current.formControl.setValue('KeySearch', name.value);
    }
  }, [name]);

  type TCustomerBase = {
    id: number;
    name: string;
    phone: string;
    email: string;
    club: Club[];
    registration: Registration[];
  };
  const customerColumn: TTableColumn<TCustomerBase>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true,
      sortable: false,
    },
    // { title: 'H??? v?? T??n', dataIndex: 'brandName', hideInSearch: true, sortable: false },
    // {
    //   title: 'H??? v?? T??n',
    //   dataIndex: 'brandName',
    //   hideInTable: true,
    //   valueEnum: brandTypeOptions.map((item) => ({ label: item.name, value: item.id })),
    //   render(value, data, index) {
    //     return value;
    //   },
    //   renderFormItem() {
    //     return (
    //       <Autocomplete
    //         value={brandName}
    //         onChange={handleChange}
    //         id="controllable-states-demo"
    //         options={brandOptions}
    //         renderInput={(params) => <TextField {...params} label="T??n th????ng hi???u" />}
    //       />
    //     );
    //   },
    //   sortable: false,
    // },
    {
      title: 'H??? v?? T??n',
      dataIndex: 'name',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'H??? v?? T??n',
      dataIndex: 'name',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: name!,
      sortable: false,
    },
    {
      title: 'S??? ??i???n tho???i',
      dataIndex: 'phone',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: '?????a ch??? ph??ng t???p',
      dataIndex: ['club', 'address'],
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Lo???i ????ng k??',
      dataIndex: ['registration', 'type'],
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'S??? l?????ng bu???i t???p',
      dataIndex: ['registration', 'numberSessions'],
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'G??i',
      dataIndex: ['registration', 'packageId'],
      hideInSearch: true,
      sortable: false,
    },
  ];

  return (
    <FormProvider {...formMethod}>
      <Page title={'Customer'}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={'Kh??ch h??ng'}
            links={[
              { name: t('content.dashboard'), href: PATH_DASHBOARD.root },

              { name: 'Kh??ch h??ng' },
            ]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.customer.add}
                startIcon={<Icon icon={plusFill} />}
              >
                {'Th??m Kh??ch H??ng'}
              </Button>
            }
          />

          <Page>
            <ResoTable
              key={'id'}
              ref={ref}
              columns={customerColumn}
              getData={customerApi.getAll}
              showAction={true}
              onDelete={handelRemoveClick}
              onEdit={(e) => navigate(`${PATH_DASHBOARD.customer.details}/${e.id}`)}
            />
          </Page>
        </Container>
        <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
          <DialogTitle>{t('common.titleConfirm')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`${t('store.removeTitleStart') + storeSelected?.name} ${t('store.removeTitleEnd')}`}
              <br />
              {t('common.canRevert')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={() => setConfirmDelete(false)}>
              {t('content.btnClose')}
            </Button>
            <Button onClick={handelConfirmRemoveClick} autoFocus>
              {t('common.confirmBtn')}
            </Button>
          </DialogActions>
        </Dialog>
      </Page>
    </FormProvider>
  );
}
