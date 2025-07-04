import { useEffect } from "react";
import { useResourceSearch } from "../hooks/useResourceSearch";
import { Observation } from "../types/observation/observation";
import ObservationTable from "./ObservationTable";

type ObservationProps = {
  type: "Lab" | "Vital Signs";
  patientID?: string;
}

const dynamicTypeToCategoryMap = {
  Lab: 'Laboratory',
  "Vital Signs" : "vital-signs",
  Imaging: "imaging"
} as const 

type ResourceType = keyof typeof dynamicTypeToCategoryMap;
type ObservationCategory = (typeof dynamicTypeToCategoryMap)[ResourceType]

function getObservationCategory(type: ResourceType) : ObservationCategory | undefined {
  return dynamicTypeToCategoryMap[type];
}


const Observations = ({ type, patientID }: ObservationProps) => {
  const { handleSearch, resources } = useResourceSearch<Observation>();
  const getCategory = (type: "Lab" | "Vital Signs") => getObservationCategory(type);

  useEffect(() => {
    if (patientID) {
      handleSearch(`Observation?subject=Patient/${patientID}&category=${getCategory(type)}`)
    }

  }, [patientID])
  return (
    <>
      <ObservationTable observations={resources} />
    </>
  )
}
export default Observations;