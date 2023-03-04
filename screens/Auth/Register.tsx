import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "../../components/common/Button/Button";
import ButtonText from "../../components/common/Button/ButtonText";
import COLORS from "../../consts/colors";
import { signUpSchema } from "../../schemas/auth";

const initDefaultValues = {
  email: "",
  password: "",
  confirmPass: "",
  phone: "",
  name: "",
};

const Register = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initDefaultValues,
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: any) => {
    console.log("🚀 ~ file: Register.tsx:29 ~ onSubmit ~ data", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Text>Logo in here</Text>
        </View>

        <Text style={styles.headerText}>Đăng ký</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name="person-circle-outline"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Họ và Tên"
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.name && (
                <Text style={{ color: "red" }}>{errors.name?.message}</Text>
              )}
            </View>
          )}
          name="name"
          rules={{ required: false }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Số điện thoại"
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.phone && (
                <Text style={{ color: "red" }}>{errors.phone?.message}</Text>
              )}
            </View>
          )}
          name="phone"
          rules={{ required: false }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Email"
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email?.message}</Text>
              )}
            </View>
          )}
          name="email"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Mật khẩu"
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.password && (
                <Text style={{ color: "red" }}>{errors.password?.message}</Text>
              )}
            </View>
          )}
          name="password"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder="Xác nhận mật khẩu"
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.confirmPass && (
                <Text style={{ color: "red" }}>
                  {errors.confirmPass?.message}
                </Text>
              )}
            </View>
          )}
          name="confirmPass"
          rules={{ required: true }}
        />
        <Button onPress={handleSubmit(onSubmit)} style={styles.buttonLogin}>
          Đăng ký ngay
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Bạn đã có tài khoản </Text>

          <ButtonText
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Đăng nhập ngay ?
          </ButtonText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  textFeild: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 10,
  },

  iconInput: {
    marginRight: 5,
    color: "#555",
  },

  buttonLogin: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
});

export default Register;
