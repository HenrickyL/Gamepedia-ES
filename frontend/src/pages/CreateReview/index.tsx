import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { StyCreateReview } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { IReducerReturn } from "../../typings/Interfaces";
import { ui, auth } from "../../store/actions";
import { Navigate } from "react-router-dom";

const CreateReview = () => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: IReducerReturn) => state.ui);

  const { register, handleSubmit } = useForm();
  const formRef = useRef(document.createElement("form"));
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [value, setValue] = React.useState("1");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [IsErrors, setErrors] = useState(false);

  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const toast = useToast();

  const callToast = (status: any, title: string, description?: string) => {
    toast({
      title: `${title}`,
      status: status,
      description: `${description}`,
      duration: 7000,
      isClosable: true,
    });
  };
  const setSignin = (data: any) => {
    data.gender = Number.parseInt(value);
    if (!invalid) {
      console.log("#Data", data);
      dispatch(auth.registerUser(data, callToast));
    }
  };

  useEffect(() => {
    setLoading(uiState.loading);
    setError(uiState.error);
    setRedirect(uiState.redirect);
  }, [uiState]);

  return (
    <StyCreateReview>
      {/* <Wrap> */}

      {redirect && <Navigate to={"/login"} />}

      <form ref={formRef} onSubmit={handleSubmit(setSignin)}>
        <h1>Criar review</h1>
        <div className="content">
          <Input
            isDisabled={load}
            isInvalid={error}
            errorBorderColor="red.300"
            required
            {...register("title")}
            type="text"
            className="input"
            size="lg"
            variant="outline"
            placeholder="Titulo"
          />

          <Textarea
            required
            isDisabled={isLoading}
            isInvalid={IsErrors}
            errorBorderColor="red.300"
            height="120px"
            {...register("description")}
            type="text"
            className="input"
            size="lg"
            variant="outline"
            placeholder="Descrição"
          />

          <Button
            isLoading={load}
            isDisabled={load}
            type="submit"
            className="button"
            onClick={() => {
              if (pwd !== pwdConfirm) {
                setInvalid(true);
              } else {
                setInvalid(false);
              }
              return formRef.current.reportValidity();
            }}
            colorScheme="blue"
            alt="Cadastrar"
          >
            Cadastrar
          </Button>
        </div>
      </form>

      {/* </Wrap> */}
    </StyCreateReview>
  );
};

export default CreateReview;
