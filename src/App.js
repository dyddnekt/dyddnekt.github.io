import 'App.css';
import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import BBSRouter from 'router/BBSRouter';
import axios from "api/axios";

const getCodeList = async (setCodeList) => {
  const response = await axios.get('/framework/anonymous/listAllContactPoint');
  setCodeList(response?.data);
}

export default function App() {
  const { codeList, setCodeList } = useContext(AppContext);
  if (!codeList) {
    getCodeList(setCodeList);
  }
  return <BBSRouter />
}
