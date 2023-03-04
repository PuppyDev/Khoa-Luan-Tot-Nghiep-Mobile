import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StepIndicator from "react-native-step-indicator-v2";
import Icon from "react-native-vector-icons/MaterialIcons";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { RadioButton } from "react-native-radio-buttons-group";
import Input from "../../components/common/\bInput";
import Button from "../../components/common/Button/Button";
import DropdownSelect from "../../components/common/Dropdown";
import { typeGender, typeOfRoom, utilities } from "../../consts/room";
import { randomId } from "../../utils";

const labels = ["Information", "Address", "Utilities", "Confirmation"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: "white",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 12,
  currentStepLabelColor: COLORS.primary,
  borderRadiusSize: 50,
};

export type FormValues = {
  name?: string;
  acreage?: number;
  basePrice?: number;
  deposit?: number;
  images?: any;
  roomElectric?: number;
  totalNbPeople?: number;
  period?: number;
  amentilities?: string[];
  address?: string;
  contract?: string;
  waterPrice?: number;
  gender?: string;
  nbCurrentPeople?: number;
  plusContract?: string;
  typeRoom?: string;
  cityName: string;
  wardName?: string;
  ditrictName?: string;
  description?: string;
};

const AddRoomScreen = () => {
  const [currentPosition, setcurrentPosition] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      typeRoom: "ROOM_FOR_RENT",
      gender: "Male",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  const [amentilities, setAmentilities] = useState<any>([]);

  return (
    <SafeAreaView>
      <MainHeader title="Add New Room" />
      <View
        style={{
          marginTop: 20,
        }}
      >
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={4}
          onPress={(pos) => setcurrentPosition(pos)}
        />
      </View>
      <ScrollView style={style.container}>
        {currentPosition === 0 && (
          <View>
            <Text style={style.headingText}>Room infomation</Text>

            <View style={style.blockInfo}>
              <Input
                control={control}
                placeholder="Acreage of room "
                name="acreage"
              />
            </View>

            <Input
              control={control}
              placeholder="Number of room/people"
              name="deposit"
            />

            <Input
              control={control}
              placeholder="Enter people current in room"
              name="nbCurrentPeople"
            />

            <View style={style.flex2Item}>
              <View>
                <Text style={style.headerBlock}>Room Type</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {typeOfRoom.map((item) => (
                        <RadioButton
                          label={item.label}
                          id={item.id}
                          value={item.value}
                          selected={item.value === value}
                          key={item.id}
                          onPress={onChange}
                          color={COLORS.primary}
                        />
                      ))}
                    </>
                  )}
                  name="typeRoom"
                />
              </View>
              <View>
                <Text style={style.headerBlock}>Gender</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {typeGender.map((item) => (
                        <RadioButton
                          label={item.label}
                          id={item.id}
                          value={item.value}
                          selected={item.value === value}
                          key={item.id}
                          onPress={onChange}
                          color={COLORS.primary}
                        />
                      ))}
                    </>
                  )}
                  name="gender"
                />
              </View>
            </View>

            <View style={{ paddingVertical: 10 }} />
            <Text style={style.headingText}>Expenses</Text>
            <View style={{ paddingVertical: 5 }} />

            <Input
              control={control}
              placeholder="Rental price"
              name="basePrice"
            />
            <Input
              control={control}
              placeholder="Deposit money"
              name="deposit"
            />

            <Input
              control={control}
              placeholder="Electric cost"
              name="roomElectric"
            />

            <Input
              control={control}
              placeholder="Water cost"
              name="waterPrice"
            />

            <Input
              control={control}
              placeholder="Internet cost"
              name="internetPrice"
            />
          </View>
        )}

        {currentPosition === 1 && (
          <View>
            <Text style={style.headingText}>Address</Text>
            <DropdownSelect
              control={control}
              name="cityName"
              placeholder="Press to choose City"
            />
            <DropdownSelect
              control={control}
              name="ditrictName"
              placeholder="Press to choose District"
            />
            <DropdownSelect
              control={control}
              name="wardName"
              placeholder="Press to choose Ward"
            />
            <Input
              control={control}
              placeholder="Ex: 16/19 Nguyen thai son"
              name="addressDetail"
            />
          </View>
        )}

        {currentPosition === 2 && (
          <View>
            <Text style={{ ...style.headingText, paddingVertical: 10 }}>
              Image
            </Text>

            <TouchableOpacity style={style.ImageUploadStyle}>
              <Icon name="cloud-upload" size={50} color={COLORS.primary} />
              <Text>Click here to post images </Text>
              <Text>from the gallery</Text>
            </TouchableOpacity>

            <Text style={{ ...style.headingText, paddingVertical: 10 }}>
              Utilities
            </Text>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {utilities.map((item, index) => {
                const active = getValues("amentilities")?.includes(item.label);
                return (
                  <TouchableOpacity
                    style={{
                      ...style.itemUtility,
                      marginLeft: index % 2 !== 0 ? "2%" : 0,
                      backgroundColor: active ? "rgb(246,246,248)" : "white",
                      borderColor: active ? COLORS.primary : "rgb(211,211,211)",
                    }}
                    key={randomId()}
                    onPress={() => {
                      const listAmentilities = getValues("amentilities") || [];
                      const duplicatedIndex = listAmentilities.findIndex(
                        (ele) => ele === item.label
                      );

                      if (duplicatedIndex !== -1)
                        listAmentilities.splice(duplicatedIndex, 1);
                      else listAmentilities.push(item.label);

                      setAmentilities(listAmentilities);
                      setValue("amentilities", listAmentilities);
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size={25}
                      color={active ? COLORS.primary : "rgb(72,72,72)"}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        color: active ? COLORS.primary : "rgb(72,72,72)",
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {currentPosition !== 3 ? (
          <Button
            onPress={() => setcurrentPosition((pre) => pre + 1)}
            style={style.buttonLogin}
          >
            Next
          </Button>
        ) : (
          <View>
            <Text style={style.headingText}>Confirmation</Text>
            <View style={style.blockInfo}>
              <Input
                control={control}
                placeholder="Enter title of the post "
                name="name"
              />

              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                {...register("description")}
                placeholder="Enter room description ( eviroment, sercurity, ...)"
                style={{
                  padding: 10,
                  borderColor: "#DDDDDD",
                  borderWidth: 1,
                  borderRadius: 4,
                  minHeight: 140,
                  maxHeight: 140,
                  fontSize: 16,
                }}
              />
            </View>
            <Button onPress={handleSubmit(onSubmit)} style={style.buttonLogin}>
              Publish room
            </Button>
          </View>
        )}

        <View style={{ paddingBottom: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },

  container: {
    padding: 20,
  },

  headingText: {
    fontSize: 18,
    color: "#232323",
    fontWeight: "400",
  },

  blockInfo: {
    marginTop: 10,
  },

  headerBlock: {
    marginBottom: 15,
    fontSize: 16,
  },

  flex2Item: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },

  buttonLogin: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },

  itemUtility: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "49%",
    paddingHorizontal: 10,

    paddingVertical: 10,
    borderRadius: 10,

    marginVertical: 3,
    borderWidth: 1,

    backgroundColor: "rgb(246,246,248)",
    borderColor: "rgb(211,211,211)",
  },

  activeItemUtility: {
    backgroundColor: "white",
    borderColor: COLORS.primary,
  },

  ImageUploadStyle: {
    height: 150,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,

    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "rgb(211,211,211)",
  },
});

export default AddRoomScreen;
