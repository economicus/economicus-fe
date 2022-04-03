import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { endpoint } from "../../apis/endpoint";
import { RootState } from "../../stores/store";
import ListViewCard from "./ListViewCard";

interface IProfileData {
  data: {
    quant: IQuantData[];
    user: IUserData;
  };
}

export interface IQuantData {
  chart: number[];
  description: string;
  name: string;
  quant_id: number;
}

interface IUserData {
  email: string;
  profile: {
    email: string;
    intro_message: string;
    location: {
      city: string;
      country: string;
    };
    nickname: string;
    phone: string;
    profile_image: string;
    user_id: number;
    user_url: string;
  };
}

const userDataInit: IUserData = {
  email: "",
  profile: {
    email: "",
    intro_message: "",
    location: {
      city: "",
      country: "",
    },
    nickname: "",
    phone: "",
    profile_image: "",
    user_id: -1,
    user_url: "",
  },
};

const PersonalProfilePage = () => {
  const [quantData, setQuantData] = useState<IQuantData[]>([]);
  const [kospiData, setKospiData] = useState<number[]>([]);
  const [userData, setUserData] = useState<IUserData>(userDataInit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.session.token);

  const resetQuantData = (index: number) => {
    const newData = quantData.splice(index);
    setQuantData(newData);
  };

  const getProfile = async (token: string) => {
    try {
      const response = (await axios.get(endpoint + "/users/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })) as IProfileData;
      setQuantData(response.data.quant);
      setUserData(response.data.user);
      return response;
    } catch (e) {
      setError((e as AxiosError).message);
      return e;
    }
  };

  useEffect(() => {
    setLoading(true);
    getProfile(token);
    setLoading(false);
  }, [quantData]);

  useEffect(() => {
    async function getKospi() {
      try {
        const res = await axios.get(endpoint + "/lab/data/kospi", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setKospiData(res.data);
        return res;
      } catch (e) {
        return e;
      }
    }
    getKospi();
  }, []);

  if (quantData.length === 0) {
    return (
      <ErrorContainer>
        <Typography variant="h5">생성된 모델이 없습니다...</Typography>
        <StyledButton
          onClick={() => {
            navigate("/QuantLabPage");
          }}
        >
          실험실 가기
        </StyledButton>
      </ErrorContainer>
    );
  } else if (error !== "") {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>로딩중</div>; //개선 필요
  }

  return (
    <MainContainer>
      {quantData &&
        Object.keys(quantData).map((key, idx) => {
          return (
            <ListViewCard
              key={key}
              modelData={quantData[idx]}
              kospiData={kospiData}
              setter={resetQuantData}
              index={idx}
            />
          );
        })}
    </MainContainer>
  );
};

export default PersonalProfilePage;

const MainContainer = styled("div")`
  /* width: 100vw; */
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 15%;
  padding-right: 15%;
`;

const ErrorContainer = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  height: 56px;
  margin: 20px 0;
`;
