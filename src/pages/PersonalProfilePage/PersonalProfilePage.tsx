import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { endpoint } from "../../apis/endpoint";
import { RootState } from "../../stores/store";
import ListViewCard from "./ListViewCard";

interface IProfileData {
  quant: IQuantData[];
  user: IUserData;
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
  const [userData, setUserData] = useState<IUserData>(userDataInit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = useSelector((state: RootState) => state.session.token);
  const user_id = 1; //user_id는 어디서 받아오지??

  //로그인 안된 상태에서는 어차피 못들어 오니까 빼도 되나?
  if (!token) {
    return <div>로그인이 필요한 페이지 입니다.</div>; // 개선 필요
  }

  const getProfile = async (token: string, user_id: number) => {
    setLoading(true);
    try {
      const response = (await axios.get(
        endpoint + "/users/profile/" + { user_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )) as IProfileData;
      setQuantData(response.quant);
      setUserData(response.user);
      return response;
    } catch (e) {
      // TEST---------------------------------
      const testres = JSON.parse(dummy1);
      setQuantData(testres.quant);
      setUserData(testres.user);
      //--------------------------------------

      // 에러 리턴해줘야함------------------------
      //setError((e as AxiosError).message);
      // return e;
      //--------------------------------------
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile(token, user_id);
  }, []);

  if (error !== "") {
    return <div>{error}</div>; //개선 필요
  }

  if (loading) {
    return <div>로딩중</div>; //개선 필요
  }

  return (
    <MainContainer>
      <StyledDiv>
        <PersonalInfoContainer>
          <LogoImage src="https://avatars.githubusercontent.com/u/98199739?s=200&v=4" />
          <StyledTypography variant="h6">
            {userData.profile.nickname}
          </StyledTypography>
          <StyledTypography variant="h6">
            모델수: {quantData.length}
          </StyledTypography>
        </PersonalInfoContainer>
        <ListViewContainer>
          {Object.keys(quantData).map((key, idx) => {
            return <ListViewCard key={key} quant={quantData[idx]} />;
          })}
        </ListViewContainer>
      </StyledDiv>
    </MainContainer>
  );
};

export default PersonalProfilePage;

const MainContainer = styled("div")`
  width: 100vw;
  dispaly: flex;
  padding-left: 15%;
  padding-right: 15%;
`;

const StyledDiv = styled("div")`
  height: 100%;
  display: flex;
  padding: 50px 0;
  justify-content: space-between;
`;

const PersonalInfoContainer = styled("div")`
  width: 20%;
`;

const LogoImage = styled("img")`
  border-radius: 5px;
  width: 150px;
  height: 150px;
  margin: 10px;
`;

const StyledTypography = styled(Typography)`
  margin: 10px;
`;

const ListViewContainer = styled("div")`
  width: 80%;
`;

const dummy1 = JSON.stringify({
  quant: [
    {
      chart: [
        8.31201046811529, 15.13554790878776, -1.336521221573761,
        -1.42408166715555, 10.420784591586559, 8.305691643668455,
        17.68356243256443, 9.407034979656027, -4.15162926200139,
        5.542443496088845, 6.654446258518339,
      ],
      description: "model description1",
      name: "model name1",
      quant_id: 1,
    },
    {
      chart: [33.12, 31.23, 32.19, 36.54, 38.18, 43.12, 41.12, 38.25, 39.63],
      description: "model description2",
      name: "model name2",
      quant_id: 2,
    },
    {
      chart: [123.4, 136.4, 140.2, 146.8, 154.1, 160.9, 157.3, 154.3, 156.6],
      description: "model description3",
      name: "model name3",
      quant_id: 3,
    },
    {
      chart: [111, 112, 123, 146.8, 154.1, 160.9, 157.3, 154.3, 156.6],
      description: "model description4",
      name: "model name4",
      quant_id: 4,
    },
  ],
  user: {
    email: "string",
    profile: {
      email: "string",
      intro_message: "string",
      location: {
        city: "string",
        country: "string",
      },
      nickname: "mher",
      phone: "string",
      profile_image: "string",
      user_id: 0,
      user_url: "string",
    },
  },
});

const dummy2 = JSON.stringify({
  quant: [],
  user: {
    email: "string",
    profile: {
      email: "string",
      intro_message: "string",
      location: {
        city: "string",
        country: "string",
      },
      nickname: "mher",
      phone: "string",
      profile_image: "string",
      user_id: 0,
      user_url: "string",
    },
  },
});
