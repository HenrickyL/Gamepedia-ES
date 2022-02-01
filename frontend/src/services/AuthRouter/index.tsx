import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "dotenv/config";
import {LoaderModel} from "../../component/LoaderModel";

type TProp = {
  action?: Function;
};

export const AuthRouter = ({ action }: TProp) => {
  const [autenticated, setAutenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  async function getAuth() {
    setAutenticated(false);
    setLoading(false);
    try {
      if (action) {
        const res = await action();
        setAutenticated(true);
        setLoading(false);
      } else {
        setError(true);
      }
    } catch (e) {
      setAutenticated(false);
      setLoading(false);
      console.error(e);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(true);
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
    }
  }, [error]);

  return (
    <>
      {error ? (
        <>
          <h1>[Erro Interno]</h1>
          <LoaderModel reverse linear color="red" pins={7} spinColor="green" />
          {redirect ? <Navigate to="/" /> : <span>Redirecionando...</span>}
        </>
      ) : loading ? (
        <LoaderModel reverse />
      ) : autenticated ? (
        <Outlet />
      ) : (
        <h1>Não autorizado</h1>
      )}
    </>
  );
};
