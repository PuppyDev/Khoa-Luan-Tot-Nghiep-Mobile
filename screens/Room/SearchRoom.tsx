import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { roomApi } from "../../api/roomApi";
import MainHeader from "../../components/common/Header/MainHeader";
import SearchInput from "../../components/others/Search/SearchInput";
import SearchResult from "../../components/others/Search/SearchResult";
import { IParamsGetRoom } from "../../models/room";

const _page = 1;
const _limit = 10;

const SearchRoom = () => {
  const [searchFilter, setSearchFilter] = useState<IParamsGetRoom>({
    page: _page,
    limit: _limit,
  });

  const {
    data: roomData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllNewRoom", searchFilter],
    queryFn: () => roomApi.getAllRoom(searchFilter),
    staleTime: 60 * 1000,
  });

  return (
    <SafeAreaView>
      <MainHeader title="Search" />
      <SearchInput />
      <SearchResult roomData={roomData?.data || null} />
    </SafeAreaView>
  );
};

export default SearchRoom;
