import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { invoiceApi } from "../../api/invoiceApi";
import { serviceApi } from "../../api/serviceApi";
import MainHeader from "../../components/common/Header/MainHeader";
import { getCurrentDate } from "../../utils/time";

const RoomDeclaration = ({ navigation, route }: { navigation: any; route: any }) => {
  const idRoom: string = route.params;
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schemaServiceDeclare),
  });

  const { mutate: createInvoiceMutate, isLoading: invoiceLoading } = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: invoiceApi.createInvoice,
    onSuccess: () => {},
    onError: () => {},
  });

  const {
    mutate: updateServiceMutate,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["UpdateServiceDemand"],
    mutationFn: serviceApi.updateServiceDemand,
    onSuccess: (data) => {
      console.log("🚀 ~ file: DeclareRoomPage.tsx:48 ~ DeclareRoomPage ~ data:", data);
      // createInvoiceMutate({contractId: "", invoiceInfo: {}})
    },
    onError: (err) => {
      console.log("🚀 ~ file: DeclareRoomPage.tsx:50 ~ DeclareRoomPage ~ err:", err);
    },
  });

  const { data: dataServices, isLoading: loadingServices } = useQuery({
    queryKey: ["getServiceRemand", idRoom],
    queryFn: () => {
      if (idRoom) {
        return serviceApi.getListServiceDemand(idRoom);
      }
      return null;
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const handleUpdateService = () => {
    if (invoiceLoading || isLoading) return;

    if (!idRoom || !dataServices || !dataServices.data) return;
    const { electricity_cost, internet_cost, water_cost } = getValues();
    updateServiceMutate({
      roomId: idRoom,
      demandInfo: {
        atMonth: getCurrentDate().month,
        demands: dataServices?.data.map((item) => {
          const isElectric = item.service.name.trim() === "electricity cost";
          const isInternet = item.service.name.trim() === "internet cost";
          return {
            serviceId: item._id,
            newIndicator: isElectric ? electricity_cost : 0,
            quality: isElectric ? 0 : isInternet ? internet_cost : water_cost,
          };
        }),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader title="Service Declaration" />

      {dataServices?.data && dataServices && (
        <View style={{ paddingHorizontal: 20 }}>
          <FlatList
            data={dataServices?.data}
            renderItem={(item) => (
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 18, textTransform: "capitalize", paddingBottom: 5 }}>{item.item.service.name}</Text>
                <TextInput
                  placeholder={item.item.service.description}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    const serviceName = item.item.service.name.trim().replace(/ /g, "_") || "name";
                    setValue(serviceName, value);
                  }}
                  mode="outlined"
                />

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 5 }}>
                  <Text>Unit price for {item.item.service.name.trim()} </Text>

                  {item.item.service.name.trim() === "electricity cost" || item.item.service.name.trim() === "Tiền điện" ? (
                    <View>
                      <Text>old index : {item.item.oldIndicator}</Text>
                      <Text>new index : {getValues("electricity_cost") || 0}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text>Service fee {item.item?.service?.basePrice}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          />

          <Button loading={loadingServices || invoiceLoading} mode="contained" onPress={handleUpdateService} style={{ marginTop: 30 }}>
            Submit now
          </Button>
        </View>
      )}

      {!dataServices?.data && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Translation cannot be declared</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoomDeclaration;
