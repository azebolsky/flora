import React, { useEffect, useState } from "react";
import { addPlantImage } from "../../firebase";
import firebase from "firebase/app";
import styled from "styled-components";

const PlantsContainer = styled.section`
  flex: 1 0 auto;
  text-align: center;
`;

const StyledHeader = styled.h1`
  color: black;
`;

const StyledPhotos = styled.div`
  width: 95%;
  min-width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const UploadPhoto = styled.span`
  height: 180px;
  width: 250px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
`;

const StyledPhoto = styled.div`
  height: 180px;
  width: 250px;
  margin: 10px;
  background-color: blue;
`;

const IndividualPlantPage = (props) => {
  const [currentPlant, setCurrentPlant] = useState({});
  const [loading, setLoading] = useState(true);
  // const [file, setFile] = useState(null);
  // const [url, setURL] = useState("");
  useEffect(() => {
    const plantId = parseInt(props.match.params.plantid);
    const plants = props.usersPlants;
    const plantData = plants.filter((plant) => {
      return plant.id === plantId;
    });
    setCurrentPlant(plantData[0]);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = firebase.storage().ref();
    // const fileRef = storageRef.child(file.name);
    const uploadTask = storageRef.child("images/" + file.name).put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress}% done`);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("unauthorized upload");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("user cancelled upload");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            console.log("unknown error occurred");
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downLoadURL) => {
          console.log("file available at ", downLoadURL);
          const url = downLoadURL;
          const plantId = parseInt(props.match.params.plantid);
          const currentUserId = firebase.auth().currentUser.uid;
          const userDoc = firebase
            .firestore()
            .collection("users")
            .doc(currentUserId);

          userDoc.get().then((userDoc) => {
            if (userDoc.exists) {
              console.log(userDoc.data());
              // const currentPlantId = userDoc
              //   .data()
              //   .plants.findIndex((plant) => plant.id == plantId);
              // const currentPlants = userDoc.data().plants[currentPlantId];
              // .plants.filter((plant) => plant.id === plantId);
              const currentPlantId = currentPlant.id;
              firebase
                .firestore()
                .collection("users")
                .doc(currentUserId)
                .update({
                  [currentPlantId]: firebase.firestore.FieldValue.arrayUnion({
                    url,
                  }),
                });
            }
          });
        });
        // userDoc.update({
        //   plants: firebase.firestore.FieldValue.arrayUnion({
        //     id: plantId,
        //     commonName: plantName,
        //     image: plantImage,
        //   }),
        // });
      }
    );
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   const uploadTask = storage.ref(`/images/${file.name}`).put(file);
  //   uploadTask.on("state_changed", console.log, console.error, () => {
  //     storage
  //       .ref("images")
  //       .child(file.name)
  //       .getDownloadURL()
  //       .then((url) => {
  //         setFile(null);
  //         setURL(url);
  //       });
  //   });
  // };

  return !loading ? (
    <PlantsContainer>
      <StyledHeader>{currentPlant.commonName}</StyledHeader>
      <StyledPhotos>
        <UploadPhoto>
          <input type="file" onChange={handleChange} />
          <button>upload to firebase</button>
        </UploadPhoto>
        {/* <img src={url} /> */}
        <StyledPhoto></StyledPhoto>
        <StyledPhoto></StyledPhoto>
        <StyledPhoto></StyledPhoto>
        <StyledPhoto></StyledPhoto>
        <StyledPhoto></StyledPhoto>
        <StyledPhoto></StyledPhoto>
      </StyledPhotos>
    </PlantsContainer>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default IndividualPlantPage;
