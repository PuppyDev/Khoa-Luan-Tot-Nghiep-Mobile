import { PropsWithChildren, useState } from "react";
import { Image, ImageBackground, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import Icon from "react-native-vector-icons/MaterialIcons";
import RateComp from "../../components/common/Rate";
import RoomDetailInfo from "../../components/common/Room/RoomDetailInfo";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { convertPhone84, randomId } from "../../utils";
import { getContract } from "../../utils/contract";

const DetailsScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const item: room = route.params;

  const [isShowContract, setIsShowContract] = useState(false);
  const [isSignContract, setIsSignContract] = useState(false);

  const handleRedirectToCall = () => {
    Linking.openURL(`tel:${"0911336236"}`);
  };

  const handleRentRoom = () => {
    if (!isSignContract) setIsShowContract(true);
    else {
      console.log("here im here");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        flex: 1,
        paddingBottom: 50,
      }}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />

      <ScrollView>
        <View style={{ position: "relative" }}>
          <ImageBackground
            style={style.headerImage}
            source={{
              uri: item?.roomAttachment?.url[0] || "",
            }}
          >
            <View style={style.header}>
              <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack} />
              <Icon name="bookmark-border" size={28} color={COLORS.white} />
            </View>
          </ImageBackground>
          <View style={style.iconContainer}>
            <Icon name="place" color={COLORS.white} size={28} />
          </View>
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item?.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: COLORS.grey,
              marginTop: 5,
            }}
          >
            {item?.address.address_detail}
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Room price</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: COLORS.grey,
                marginLeft: 5,
              }}
            >
              ${item?.basePrice}
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
            <View style={style.avatar}>
              <Image
                style={style.avatar}
                source={{
                  uri: `https://api.multiavatar.com/${randomId()}.png`,
                }}
              />
            </View>

            <View style={{ marginLeft: 15, justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>{item?.owner?.name || "Updating..."}</Text>
              <TouchableOpacity onPress={handleRedirectToCall}>
                <Text style={{ fontSize: 16 }}>{convertPhone84(item?.owner.phone) || "Updating..."}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </DetailsScreen.Card>

        <DetailsScreen.Card label="Thông tin phòng">
          <RoomDetailInfo label="Trạng Thái" value="Hết phòng" highlight="unactive" />
          <RoomDetailInfo label="GIÁ PHÒNG" value={item?.basePrice.toLocaleString() + " đồng"} />
          <RoomDetailInfo label="DIỆN TÍCH" value={item?.acreage + " m2"} />
          <RoomDetailInfo label="SỨC CHỨA" value="8 Nam hoặc Nữ" />
          <RoomDetailInfo label="ĐẶT CỌC" value={item?.deposit.toLocaleString() + " đồng"} />
          <RoomDetailInfo label="ĐIỆN" value="500,000 đồng" />
          <RoomDetailInfo label="ĐIẠ CHỈ" value="214B Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh" width="100%" />
        </DetailsScreen.Card>

        <DetailsScreen.Card label="Tiện ích">
          <RoomDetailInfo label="GIÁ PHÒNG" value="1,500,000 đồng" />
          <RoomDetailInfo label="DIỆN TÍCH" value="30 mét vuông" />
          <RoomDetailInfo label="SỨC CHỨA" value="8 Nam hoặc Nữ" />
          <RoomDetailInfo label="ĐẶT CỌC" value="1 tháng" />
          <RoomDetailInfo label="ĐIỆN" value="500,000 đồng" />
        </DetailsScreen.Card>

        <DetailsScreen.Card label="Mô tả thêm">
          <Text>{item.description}</Text>
        </DetailsScreen.Card>

        <View style={{ padding: 20 }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity style={style.btn} onPress={handleRentRoom}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
            }}
          >
            Thuê ngay
          </Text>
        </TouchableOpacity>
      </View>
      <DetailsScreen.Contract
        onSign={() => {
          setIsSignContract(true);
          handleRentRoom();
        }}
        isShowContract={isShowContract}
        onHideModal={() => setIsShowContract(false)}
      />
    </ScrollView>
  );
};

interface IProps extends PropsWithChildren {
  label: string;
}

DetailsScreen.Card = ({ label, children }: IProps) => {
  return (
    <View style={style.cardStyle}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>{label}</Text>

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

const source = {
  html: getContract({}),
};

DetailsScreen.Contract = ({ isShowContract, onHideModal, onSign }: { isShowContract: boolean; onHideModal?: () => void; onSign: () => void }) => {
  const { width } = useWindowDimensions();

  return (
    <Portal>
      <Modal visible={isShowContract} onDismiss={onHideModal} contentContainerStyle={{ backgroundColor: "white", padding: 10 }}>
        <ScrollView>
          <RenderHtml contentWidth={width} source={source} />
          <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            <View style={style.cardViewSign}>
              <Text style={{ ...style.headingText, borderRightColor: "transparent" }}>Ben Cho thue</Text>
            </View>

            <View style={style.cardViewSign}>
              <Text style={style.headingText}>Ben thue</Text>
            </View>
          </View>
          <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            <View style={style.cardViewSign}>
              <View style={style.CardSign}>
                <Text>Bao</Text>
                <Text style={{ fontSize: 15, marginTop: 5, color: COLORS.primary }}>Doan Ngoc Quoc Bao</Text>
              </View>
            </View>

            <View style={style.cardViewSign}>
              <View style={style.CardSign}>
                <TouchableOpacity onPress={onSign}>
                  <Text>Click to Sign Contract </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 60,
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
    borderRadius: 100,
  },

  cardStyle: {
    marginHorizontal: 10,
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 15,
  },

  cardViewSign: {
    flex: 1,
  },

  textCenter: {
    textAlign: "center",
  },

  headingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  CardSign: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsScreen;
