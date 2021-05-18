import React from "react";
import SuccessImage from "../../Assets/sunflower.jpg";
import altPlantImage from "../../Assets/alt-plant-image2.jpg";
import altPlantImage2 from "../../Assets/kaufmann-mercantile-a7Woj8W6J0s-unsplash.jpg";
import styled from "styled-components";

const SuccessContainer = styled.section`
  background-image: url(${SuccessImage});
  background-size: auto 100%;
  background-position: center top;
  background-repeat: no-repeat;
  background-color: rgb(251, 251, 251);
  min-height: 100vh;
`;

const Heading = styled.h1`
  font-size: 40px;
  text-align: center;
`;

// const SuccessfulImage = styled.img`
//   width: 60%;
//   height: auto;
//   margin: 0 auto;
// `;

const RegisterSuccess = () => {
  return (
    <SuccessContainer>
      <Heading>Success! </Heading>
      {/* <SuccessfulImage src={SuccessImage} alt="success-image" /> */}
    </SuccessContainer>
  );
};

export default RegisterSuccess;
