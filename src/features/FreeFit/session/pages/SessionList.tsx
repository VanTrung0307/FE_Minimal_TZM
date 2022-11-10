// material
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
// material
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
import { useNavigate } from 'react-router-dom';
// redux
// routes
import courseApi from 'api/FreeFitApi/courseApi';
import sessionApi from 'api/FreeFitApi/sessionApi';
import ResoTable from 'components/table/ResoTable';
import { TTableColumn } from 'components/table/table';
import { PATH_DASHBOARD } from 'routes/paths';
import { selectBrandTypeOptions, selectFilter, storeActions } from '../storeSlice';

export default function SessionList() {
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
      await courseApi.remove(storeSelected?.id || 0);
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

  const [categoryName, setCategoryName] = useState<any>(null);
  const handleChange = (event: any, newValue: any) => {
    setCategoryName(newValue);
  };

  useEffect(() => {
    if (categoryName === null) {
      ref.current.formControl.setValue('categoryName', '');
      ref.current.formControl.setValue('categoryName', '');
    }
    if (ref.current && categoryName) {
      ref.current.formControl.setValue('categoryName', 'categoryName');
      ref.current.formControl.setValue('categoryName', categoryName.value);
    }
  }, [categoryName]);

  type TSessionBase = {
    id?: number;
    date?: Date;
    ptid?: number;
    courseId?: number;
    clubId?: number;
    status?: number;
    checkInTime?: Date;
    checkOutTime?: Date;
  };
  const sessionColumn: TTableColumn<TSessionBase>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Ngày Giờ',
      dataIndex: 'date',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Mã PT',
      dataIndex: 'ptid',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Mã khoá học',
      dataIndex: 'courseId',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Mã Phòng tập',
      dataIndex: 'clubId',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Check In',
      dataIndex: 'checkInTime',
      hideInSearch: true,
      sortable: false,
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOutTime',
      hideInSearch: true,
      sortable: false,
    },
  ];

  return (
    <FormProvider {...formMethod}>
      <Page title={'Lớp Tập'}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={'Lớp Tập'}
            links={[
              { name: t('content.dashboard'), href: PATH_DASHBOARD.root },
              { name: 'Lớp Tập' },
            ]}
            // action={
            //   <Button
            //     variant="contained"
            //     component={RouterLink}
            //     to={PATH_DASHBOARD.exercise.add}
            //     startIcon={<Icon icon={plusFill} />}
            //   >
            //     {'Thêm PT'}
            //   </Button>
            // }
          />

          <Page>
            <ResoTable
              key={'registerId'}
              ref={ref}
              columns={sessionColumn}
              getData={sessionApi.getAll}
              showAction={true}
              onDelete={handelRemoveClick}
              onEdit={(e) => navigate(`${PATH_DASHBOARD.store.details}/${e.id}`)}
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
