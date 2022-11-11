import { PaginationRequest, Response, Store, StoreType, TradeZone, BrandType } from 'models';
import { AttrResponse } from 'models/dto/attrResponse';
import { Club, PostClub } from 'models/freefit/club';
import { PostAttr } from '../../models/dto/attr';
import { PostStore, Template, PostTemplate } from '../../models/dto/store';
import axiosClient from '../axiosClient';

const clubApi = {
  getAll(): Promise<Array<Club>> {
    const url = '/club';
    return axiosClient.get(url);
  },
  getAllPaging(params: PaginationRequest): Promise<Response<Club>> {
    const url = '/club';
    return axiosClient.get(url, { params });
  },
  remove(id: number): Promise<Club> {
    const url = `/club/${id}`;
    return axiosClient.delete(url);
  },
  getClubById(id: string): Promise<Club> {
    const url = `/club/ClubById${id}`;
    return axiosClient.get(url);
  },
  add(data: PostClub): Promise<Club> {
    const url = '/club';
    return axiosClient.post(url, data);
  },
  update(id: number, data: PostClub): Promise<Club> {
    const url = `/club/${id}`;
    return axiosClient.put(url, data);
  },
  getAttrField(storeId: string, storeTypeId: string | undefined): Promise<AttrResponse[]> {
    const url = `/stores/${storeId}/store-type/${storeTypeId}/attr-group-details`;
    return axiosClient.get(url);
  },
  getTemplates(params: PaginationRequest): Promise<Template[]> {
    const url = '/stores/templates';
    return axiosClient.get(url, { params });
  },
  updateStoreTemplate(id: string | undefined, data: PostTemplate): Promise<Store> {
    const url = `/stores/${id}/templates`;
    return axiosClient.put(url, data);
  },
  updateAttrs(id: string | undefined, data: PostAttr[]) {
    const url = `/stores/${id}/attrs-insert-value`;
    return axiosClient.put(url, data);
  },
  getStoreTradeZones(id: string): Promise<TradeZone[]> {
    const url = `/stores/${id}/trade-zones`;
    return axiosClient.get(url);
  },
  getStoresInGz(id: number): Promise<Array<Store>> {
    const url = `/stores/group-zone/${id}`;
    return axiosClient.get(url);
  },
  getStoreEmptyTz(id: number): Promise<Array<Store>> {
    const url = `/stores/version/${id}`;
    return axiosClient.get(url);
  },
};
export default clubApi;
