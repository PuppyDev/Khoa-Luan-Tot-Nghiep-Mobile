import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { loginSchema } from '../schemas/auth'
import Button from '../components/common/Button/Button'
import ButtonText from '../components/common/Button/ButtonText'
import { KeyboardAvoidingView } from 'react-native'
import { Alert } from 'react-native'

const Login = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: any) => {
    console.log('🚀 ~ file: Login.tsx:22 ~ onSubmit ~ data', data)

    Alert.prompt(
      'Thông Báo',
      'Chúng tôi đã gửi 1 mã OTP đến điện thoại của bạn ',
      (data) => {
        console.log('🚀 ~ file: Login.tsx:36 ~ Alert.prompt ~ data', data)
      }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior='padding'
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Text>Logo in here</Text>
        </View>

        <Text style={styles.headerText}>Đăng Nhập</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <MaterialIcons
                  name='alternate-email'
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder='Email'
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.email && (
                <Text style={{ color: 'red' }}>{errors.email?.message}</Text>
              )}
            </View>
          )}
          name='email'
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.textFeild}>
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  style={styles.iconInput}
                />
                <TextInput
                  placeholder='Password'
                  secureTextEntry
                  style={{ flex: 1, paddingVertical: 0 }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
              {errors.email && (
                <Text style={{ color: 'red' }}>{errors.password?.message}</Text>
              )}
            </View>
          )}
          name='password'
          rules={{ required: true }}
        />

        <View style={{ alignItems: 'flex-end' }}>
          <ButtonText onPress={() => navigation.navigate('ForgotPass')}>
            Quên mật khẩu ?
          </ButtonText>
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{
            ...styles.buttonLogin,
            opacity: isSubmitting || !isValid ? 0.3 : 1,
          }}>
          Đăng nhập
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Bạn là người mới </Text>

          <ButtonText onPress={() => navigation.navigate('Register')}>
            Đăng ký ngay ?
          </ButtonText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  textFeild: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 10,
  },

  iconInput: {
    marginRight: 5,
    color: '#555',
  },

  buttonLogin: {
    backgroundColor: '#1A94FF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
})

export default Login
