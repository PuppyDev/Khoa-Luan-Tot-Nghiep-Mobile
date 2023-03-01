import { SafeAreaView } from "react-native";
import MainHeader from "../../components/common/Header/MainHeader";
import SearchInput from "../../components/others/Search/SearchInput";
import SearchResult from "../../components/others/Search/SearchResult";

const SearchRoom = () => {
  return (
    <SafeAreaView>
      <MainHeader title="Search" />
      <SearchInput />
      <SearchResult />
    </SafeAreaView>
  );
};

export default SearchRoom;
