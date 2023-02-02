import * as yup from 'yup'

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Nhập sai định dạng email')
      .required('Vui lòng nhập Email'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu phải chứa từ 8 kí tự và phải có 1 ký tự hoa, thường và số '
      ),
  })
  .required()

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const signUpSchema = yup
  .object({
    name: yup.string().required('Vui lòng nhập Họ và Tên'),
    email: yup
      .string()
      .email('Nhập sai định dạng email')
      .required('Vui lòng nhập Email'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Vui lòng nhập đúng số điện thoại'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu phải chứa từ 8 kí tự và phải có 1 ký tự hoa, thường và số '
      ),
    confirmPass: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
  })
  .required()
