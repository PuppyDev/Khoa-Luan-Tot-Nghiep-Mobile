import React from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const AccountScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20220429/original/pngtree-dog-with-bell-going-to-sleep-pet-social-media-avatar-png-image_7572709.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              Yone Doan
            </Title>
            <Caption style={styles.caption}>@yone_doan_29</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          {/* <Icon name="map-marker-radius" color="#777777" size={20}/> */}
          <Ionicons name="locate-outline" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Go Vap, VietNam
          </Text>
        </View>
        <View style={styles.row}>
          {/* <Icon name="phone" color="#777777" size={20}/> */}
          <Ionicons name="call-outline" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +84-911336236
          </Text>
        </View>
        <View style={styles.row}>
          {/* <Icon name="email" color="#777777" size={20}/> */}
          <Ionicons name="mail-open-outline" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            yonedoan@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("WalletScreen")}
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>$140.50</Title>
          <Caption>Wallet Bughouse</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RoomRentedScreen")}
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>2</Title>
          <Caption>Rooms rented</Caption>
        </TouchableOpacity>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("WalletScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="cash-outline" size={25} color="#777777" />

            <Text style={styles.menuItemText}> Wallet </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("AddroomScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="hammer-outline" size={25} color="#777777" />
            <Text style={styles.menuItemText}>Publish Room</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("RoomForRentScreen")}>
          <View style={styles.menuItem}>
            <Ionicons name="hammer-outline" size={25} color="#777777" />
            <Text style={styles.menuItemText}>For Rent</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => navigation.navigate("ChangePassScreen")}
        >
          <View style={styles.menuItem}>
            <Ionicons name="apps" size={25} color="#777777" />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={25} color="#FF6347" />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
