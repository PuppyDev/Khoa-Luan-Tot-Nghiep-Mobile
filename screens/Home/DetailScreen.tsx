import { PropsWithChildren } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RateComp from "../../components/common/Rate";
import RoomDetailInfo from "../../components/common/Room/RoomDetailInfo";
import COLORS from "../../consts/colors";

const DetailsScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const item = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        flex: 1,
        paddingBottom: 50,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />

      <ScrollView>
        <View style={{ position: "relative" }}>
          <ImageBackground style={style.headerImage} source={item.image}>
            <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                size={28}
                color={COLORS.white}
                onPress={navigation.goBack}
              />
              <Icon name="bookmark-border" size={28} color={COLORS.white} />
            </View>
          </ImageBackground>
          <View style={style.iconContainer}>
            <Icon name="place" color={COLORS.white} size={28} />
          </View>
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: COLORS.grey,
              marginTop: 5,
            }}
          >
            {item.location}
          </Text>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <RateComp numStar={4} isDisplayText />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Giá Phòng</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: COLORS.grey,
                marginLeft: 5,
              }}
            >
              ${item.price}
            </Text>
          </View>
        </View>

        <DetailsScreen.Card label="Thông tin chủ phòng ">
          <View
            style={{
              marginTop: 5,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={style.avatar}></View>

            <View style={{ marginLeft: 15, justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>Thanh Quang</Text>
              <Text style={{ fontSize: 16 }}>SĐT: 0911336236</Text>
            </View>
          </View>
        </DetailsScreen.Card>

        <DetailsScreen.Card label="Thông tin phòng">
          <RoomDetailInfo
            label="Trạng Thái"
            value="Hết phòng"
            highlight="unactive"
          />
          <RoomDetailInfo label="GIÁ PHÒNG" value="1,500,000 đồng" />
          <RoomDetailInfo label="DIỆN TÍCH" value="30 mét vuông" />
          <RoomDetailInfo label="SỨC CHỨA" value="8 Nam hoặc Nữ" />
          <RoomDetailInfo label="ĐẶT CỌC" value="1 tháng" />
          <RoomDetailInfo label="ĐIỆN" value="500,000 đồng" />
          <RoomDetailInfo
            label="ĐIẠ CHỈ"
            value="214B Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh"
            width="100%"
          />
        </DetailsScreen.Card>

        <DetailsScreen.Card label="Tiện ích">
          <RoomDetailInfo label="GIÁ PHÒNG" value="1,500,000 đồng" />
          <RoomDetailInfo label="DIỆN TÍCH" value="30 mét vuông" />
          <RoomDetailInfo label="SỨC CHỨA" value="8 Nam hoặc Nữ" />
          <RoomDetailInfo label="ĐẶT CỌC" value="1 tháng" />
          <RoomDetailInfo label="ĐIỆN" value="500,000 đồng" />
        </DetailsScreen.Card>

        <DetailsScreen.Card label="Mô tả thêm">
          <Text>
            Chính chủ cho thuê phòng dịch vụ đường Hoàng Hoa Thám kv Bình Thạnh.
            Giá 3,5tr - 5tr Tiện nghi: Có máy giặt, máy lạnh, máy nước nóng
            lạnh, tủ, bếp từ, giường niệm, bàn ghế làm việc, tủ lạnh, bồn tắm
            rất sạch sẽ. Phòng có cửa sổ rất thoáng mát. Thuận tiện: gần hàng
            xanh, trường đại học Hurtech, Hồng Bàng, bv Ung Bướu, gia định..
            xung quanh có nhiều quán cf, quán ăn, Trung tâm thể dục, công viên,
            cty.... Đi ra Quận 1, gò Vấp, Phú Nhuận chỉ 5 phút. Hình thật.
          </Text>
        </DetailsScreen.Card>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <View style={style.btn}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
            }}
          >
            Thuê ngay
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface IProps extends PropsWithChildren {
  label: string;
}

DetailsScreen.Card = ({ label, children }: IProps) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        paddingLeft: 10,
        marginTop: 20,
        borderRadius: 15,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
        {label}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {children}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
  },

  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    bottom: 0,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: 30 }],
    elevation: 3,
  },
  headerImage: {
    height: 400,
    overflow: "hidden",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    position: "relative",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },

  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "105%",
  },

  textStyle: {
    color: "#fff",
    fontSize: 22,
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "pink",
    borderRadius: 100,
  },
});

export default DetailsScreen;
