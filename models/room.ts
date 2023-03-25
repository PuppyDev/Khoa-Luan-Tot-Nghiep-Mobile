import { IOwnerInfo } from "./user";

export interface RoomFilters {
  price: {
    min: number;
    max: number;
  };
  utilities: {};
  typeRoom: {
    all: boolean;
    isRent: boolean;
    isShareRoom: boolean;
    isDormRoom: boolean;
    isWholeHouse: boolean;
    isApartment: boolean;
  };
  sex: {
    male: boolean;
    female: boolean;
    all: boolean;
  };
}

export interface IParamsGetRoom {
  page: number;
  limit: number;
  range?: {
    form: number;
    to: number;
  };
  Utilities?: {};
  typeRoom?: string;
  gender?: string;
  search?: string;
}

export interface room {
  _id: string;
  name: string;
  acreage: number;
  nbCurrentPeople: number;
  totalNbPeople: number;
  gender: string;
  typeRoom: string;
  deposit: number;
  description: string;
  amentilities: string[];
  basePrice: number;
  roomAttachment: {
    url: string[];
  };
  services: string[];
  owner: {
    _id: string;
    username: string;
    email: string;
    phone: string;
    identity: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  address: AddressType;
}

export type AddressType = {
  code_city: string;
  code_dictrict: string;
  code_ward: string;
  code_street: string;
  Lat_ggmap: number;
  Lng_ggmap: number;
  address_detail: string;
};

export interface IRoomParams {
  name: string;
  description: string;
  basePrice: number | string;
  acreage: number | string;
  typeRoom: string;
  nbCurrentPeople: number | string;
  totalNbPeople: number | string;
  deposit: number | string;
  gender: string;
  cityName: string;
  ditrictName: string;
  streetName: string;
  wardName: string;
  addressDetail: string;
  roomAttachment: {
    url: string[];
  };
  amentilities: string[];
  services: IServiceType[];
}

export interface IServiceType {
  name: string;
  description: string;
  basePrice: number | string;
  unitName: string;
}

export interface IpropsRoomMaster {
  dataOwner: IOwnerInfo | undefined;
  postDate: string | undefined;
}

export interface IResponseRented {
  dateRent: string;
  room: room;
  _id: string;
}
