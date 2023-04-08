import { CommonPagination } from "../models";
import { INotification } from "../models/notification";
import { IResUserWallet, ITransaction, IUserWallet, IWalletInfo } from "../models/user";
import axiosClient from "./axiosClient";

const BASES_URL = "/users";

export const userApi = {
  topupMoney(params: IUserWallet) {
    return axiosClient.post<IResUserWallet>(`${BASES_URL}/wallet-connect`, params);
  },

  getWalletInfo() {
    return axiosClient.get<IWalletInfo>(`${BASES_URL}/me/wallet`);
  },

  getWalletTransaction() {
    return axiosClient.get<CommonPagination<ITransaction[]>>(`${BASES_URL}/me/transaction-history`);
  },

  getAllNotifications() {
    return axiosClient.get<CommonPagination<INotification[]>>(`${BASES_URL}/notifications`);
  },
};
