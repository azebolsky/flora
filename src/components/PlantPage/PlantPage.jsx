import React, { useState, useEffect } from "react";

const PlantPage = (props) => {
  const [currentPlant, setCurrentPlant] = useState();
  const currentPlantId = parseInt(props.match.params.id);

  useEffect(() => {
    return getPlantInfo(currentPlantId);
  }, []);

  const getPlantInfo = (id) => {
    const result = props.plantItems.filter((plantItem) => plantItem.id === id);
    return setCurrentPlant(result[0]);
  };

  return (
    <div>
      <h1>{currentPlant.common_name}</h1>
      <h2>plant PlantPage</h2>
    </div>
  );
};

export default PlantPage;
