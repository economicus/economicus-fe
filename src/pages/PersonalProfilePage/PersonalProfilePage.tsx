import { Button } from "@mui/material";
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

  const getProfile = async (token: string) => {
    console.log(token);
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
      // TEST dummy--------------------------
      // const testres = JSON.parse(dummy1);

      // setQuantData(testres.quant);
      // setUserData(testres.user);
      // ------------------------------------

      setError((e as AxiosError).message);
      return e;
    }
  };

  useEffect(() => {
    setLoading(true);
    getProfile(token);
    setLoading(false);
  }, []);

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
        // console.log("kospi data", res.data); // NOTE: test
        return res;
      } catch (e) {
        return e;
      }
    }
    getKospi();
  }, []);

  // if (
  //   error === "Request failed with status code 500" &&
  //   quantData.length === 0
  // ) {
  //   //개선필요
  //   return (
  //     <ErrorContainer>
  //       <StyledPaper>
  //         <Typography component="h1" variant="h5">
  //           생성된 모델이 없습니다...
  //         </Typography>
  //         <StyledButton
  //           fullWidth
  //           onClick={() => {
  //             navigate("/QuantLabPage");
  //           }}
  //         >
  //           실험실 가기
  //         </StyledButton>
  //       </StyledPaper>
  //     </ErrorContainer>
  //   );
  // } else if (error !== "") {
  //   return <div>{error}</div>;
  // }

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

const ListViewContainer = styled("div")`
  width: 100%;
`;

const ErrorContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;
const StyledPaper = styled("div")`
  width: 400px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 56px;
  margin: 20px 0;
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
