import { ILoginProps, ILoginPropsError } from "@/types/login.types";

export const validateLogin = (input: ILoginProps): ILoginPropsError => {
    const errors: ILoginPropsError = {};
    const regexLettersOnly = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexStrongPassword = /^[A-Za-z0-9@$!%*?&]+$/;

      if (input.email.trim().length < 1) {
        errors.email = `El campo username es obligatorio`;
      } else if (!regexLettersOnly.test(input.email)) {
        errors.email = `Carácter no admitido`;
      }

      if (input.password && input.password.trim().length < 1) {
        errors.password = `El campo password es obligatorio`;
      } else if (!regexStrongPassword.test(input.password!)) {
        errors.password = `Carácter no admitido`;
      }

    return errors;
}