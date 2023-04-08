import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import StepIndicator from "react-native-step-indicator-v2";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addressApi } from "../../api/addressApi";
import { roomApi } from "../../api/roomApi";
import Input from "../../components/common/\bInput";
import Button from "../../components/common/Button/Button";
import DropdownSelect from "../../components/common/Dropdown";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import { typeGender, typeOfRoom, utilities } from "../../consts/room";
import { room } from "../../models/room";
import { schemaFormCreateRoom } from "../../schemas/form";
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
  plusContract?: string;
  ditrictName?: string;
  cityName?: string;
  typeRoom: string;
  addressDetail: string;
  internetCost: string;
  wardName: string;
  streetName: string;
  roomAttachment?: {
    url: string;
  };
  description: string;
  nbCurrentPeople: number;
  internetPrice: number;
};

const defaultValues = {
  totalNbPeople: 1,
  period: 1,
  amentilities: [],
  ditrictName: "Quận 1",
  cityName: "Hồ Chí Minh",
  gender: "All",
  typeRoom: "ROOM_FOR_RENT",
  wardName: "",
  streetName: "",
  nbCurrentPeople: 0,
  internetPrice: 0,
  description: "",
  name: "",
  acreage: 0,
  basePrice: 0,
  deposit: 0,
  roomElectric: 0,
  address: "",
  addressDetail: "",
};

const AddRoomScreen = ({ route }: { route: any }) => {
  const item: room = route.params;
  const [currentPosition, setcurrentPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schemaFormCreateRoom),
  });

  useEffect(() => {
    if (item) {
      const { address, services } = item;
      console.log("Vo ne");
      reset({
        ...item,
        streetName: address.street,
        wardName: address.ward,
        ditrictName: address.district,
        addressDetail: address.addressDetail,

        roomElectric: services[1]?.basePrice,
        waterPrice: services[2]?.basePrice,
        internetCost: services[0]?.basePrice,
        nbCurrentPeople: item.nbCurrentPeople,
      } as unknown as FormValues);
      setDistrictName(item.address.district);
    }
  }, [item]);

  console.log("values", getValues());

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      try {
        const { images } = values;

        const formData = new FormData();
        for (let i = 0; i < images?.length; i++) {
          formData.append("images", images[i]);
        }

        if (images && images?.length > 0) {
          const response = await axios.post("http://localhost:8000/bh/images/upload", formData);
          handleCreateRoom(values, response);
        } else {
          handleCreateRoom(values, { data: { imageLinks: ["123"] } });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error: any) {}
  };

  const handleCreateRoom = async (values: any, response: any) => {
    values.roomAttachment = { url: response?.data.imageLinks };
    values.contract = "";
    values.plusContract = "";
    values.description = "Phong tien nghi";
    values.services = [
      {
        name: "internet cost",
        description: "internet, wifi cost per month",
        basePrice: values.internetCost,
        unitName: "person(s)/month",
      },
      {
        name: "electricity cost",
        description: "power cost per month",
        basePrice: values.roomElectric,
        unitName: "kWh",
      },
      {
        name: "water cost",
        description: "water cost per month",
        basePrice: values.waterPrice,
        unitName: "person(s)/month",
      },
    ];

    try {
      const response = await roomApi.createRoom(values);

      Alert.alert("Room info", "Create new room successfully!!!", [
        {
          text: "OK",
          onPress: () => {
            reset(defaultValues);
            setcurrentPosition(0);
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [amentilities, setAmentilities] = useState<any>([]);

  const { data: dataDistric } = useQuery({
    queryKey: ["getAllDistrics"],
    queryFn: () => addressApi.getAllDistrics(),
    staleTime: Infinity,
  });

  const [districtName, setDistrictName] = useState(getValues("ditrictName") || "Quận 1");

  const { data: dataWards } = useQuery({
    queryKey: ["getAllWards", districtName],
    queryFn: () => addressApi.getAllWards(districtName || "Quận 1"),
    staleTime: Infinity,
  });

  const { data: dataNameDistricts } = useQuery({
    queryKey: ["getAllNameDistricts", districtName],
    queryFn: () => addressApi.getAllStreets(districtName || "Quận 1"),
    staleTime: Infinity,
  });

  return (
    <SafeAreaView>
      <MainHeader title={false ? "Edit Your Room" : "Add New Room"} />
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
              <Input control={control} placeholder="Acreage of room " name="acreage" error={errors.acreage?.message} />
            </View>

            <Input control={control} placeholder="Number of room/people" name="totalNbPeople" error={errors.totalNbPeople?.message} />

            <Input control={control} placeholder="Enter people current in room" name="nbCurrentPeople" error={errors.nbCurrentPeople?.message} />

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

            <Input control={control} placeholder="Rental price" name="basePrice" error={errors.basePrice?.message} />
            <Input control={control} placeholder="Deposit money" name="deposit" error={errors.deposit?.message} />

            <Input control={control} placeholder="Electric cost" name="roomElectric" error={errors.roomElectric?.message} />

            <Input control={control} placeholder="Water cost" name="waterPrice" error={errors.waterPrice?.message} />

            <Input control={control} placeholder="Internet cost" name="internetCost" error={errors.internetPrice?.message} />
          </View>
        )}

        {currentPosition === 1 && (
          <View>
            <Text style={style.headingText}>Address</Text>
            <DropdownSelect control={control} name="cityName" placeholder="Press to choose City" />
            <DropdownSelect
              data={dataDistric?.data.listDitrict.map((item) => ({ label: item, value: item }))}
              control={control}
              name="ditrictName"
              placeholder="Press to choose District"
              onchange={(item: { label: string; value: string } | null) => {
                if (item?.value) setDistrictName(item.value);
                else setDistrictName("Quận 1");
              }}
            />
            <DropdownSelect
              data={dataWards?.data.wards.map((item) => ({ label: item, value: item }))}
              control={control}
              name="wardName"
              placeholder="Press to choose Ward"
            />
            <DropdownSelect
              data={dataNameDistricts?.data.streets.map((item) => ({ label: item, value: item }))}
              control={control}
              name="streetName"
              placeholder="Press to choose street name"
            />
            <Input control={control} placeholder="Ex: 16/19 Nguyen thai son" name="addressDetail" error={errors.addressDetail?.message} />
          </View>
        )}

        {currentPosition === 2 && (
          <View>
            <Text style={{ ...style.headingText, paddingVertical: 10 }}>Image</Text>

            <TouchableOpacity style={style.ImageUploadStyle}>
              <Icon name="cloud-upload" size={50} color={COLORS.primary} />
              <Text>Click here to post images </Text>
              <Text>from the gallery</Text>
            </TouchableOpacity>

            <Text style={{ ...style.headingText, paddingVertical: 10 }}>Utilities</Text>

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
                      const duplicatedIndex = listAmentilities.findIndex((ele) => ele === item.label);

                      if (duplicatedIndex !== -1) listAmentilities.splice(duplicatedIndex, 1);
                      else listAmentilities.push(item.label);

                      setAmentilities(listAmentilities);
                      setValue("amentilities", listAmentilities);
                    }}
                  >
                    <Icon name={item.icon} size={25} color={active ? COLORS.primary : "rgb(72,72,72)"} />
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
            onPress={() => {
              setcurrentPosition((pre) => pre + 1);
            }}
            style={style.buttonLogin}
          >
            Next
          </Button>
        ) : (
          <View>
            <Text style={style.headingText}>Confirmation</Text>
            <View style={style.blockInfo}>
              <Input control={control} placeholder="Enter title of the post " name="name" error={errors.name?.message} />

              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    {...field}
                    placeholder="Enter room description ( eviroment, sercurity, ...)"
                    style={style.textDes}
                  />
                )}
                name="description"
              />

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading || isSubmitting}
                loading={isLoading || isSubmitting}
                style={style.buttonLogin}
              >
                Publish room
              </Button>
            </View>
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

  textDes: { padding: 10, borderColor: "#DDDDDD", borderWidth: 1, borderRadius: 4, minHeight: 140, maxHeight: 140, fontSize: 16 },
});

export default AddRoomScreen;
