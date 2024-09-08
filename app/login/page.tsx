"use client";
import TextFieldComp from "../common/input/TextFieldComp";
import { PasswordWithEyes } from "../common/input/PasswordWithEyes";
import MamenIcon from "@/public/logo.svg";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Alert, Grow } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useSnackBar,
  SnackBarInterface,
} from "@/app/common/toaster/SnackbarProvider";

interface LoginInterface {
  email: string;
  password: string;
}

const Login = () => {
  const [is_loading, setLoading] = useState(false);
  const router = useRouter();
  const { openSnackbar } = useSnackBar() as SnackBarInterface;
  const [is_error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };

  const { control, handleSubmit, getValues } = useForm<LoginInterface>({
    defaultValues: defaultValues,
  });

  const submitForm = async (values: LoginInterface) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        throw new Error(res.error);
      } else {
        setError(false);
        openSnackbar("success", "Login Success");
        router.replace("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      setErrMsg(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="h-[80%] w-[80%] bg-grey-200 p-3 rounded-xl flex flex-wrap items-center justify-center border-gray-300 border-solid border-4 shadow-[0px_0px_5px_5px_] shadow-gray-200 ">
        <div className="flex flex-col items-center">
          <Image src={MamenIcon} alt="logo" width={100} height={100} />
          <h2 className="text-black">PARKLE</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col px-4">
            <TextFieldComp
              control={control}
              label="Email"
              name="email"
              sx={{ mt: "30px", color: "white" }}
            />
            <PasswordWithEyes
              control={control}
              label="Password"
              name="password"
              sx={{ mt: "30px", color: "white" }}
            />
            <div className="flex w-full justify-end  mt-4">
              <LoadingButton
                type="submit"
                loading={is_loading}
                variant="contained"
              >
                Login
              </LoadingButton>
            </div>
            <Grow in={is_error}>
              <Alert severity="error">{errorMsg}</Alert>
            </Grow>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
