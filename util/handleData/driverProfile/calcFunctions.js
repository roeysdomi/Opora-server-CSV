const {csvToJson} = require("../../handleCsv/readCSV");

const convertTimeToMinutes = time => {
 const timesplit = time.split(":");
 return timesplit[0] * 60 + timesplit[1];
};
const convertMinutesToTime = unconvertMinutes => {
 const hours = unconvertMinutes / 60;
 let minutes = unconvertMinutes % 60;
 return hours + ":" + minutes;
};
const filterResultsByDriverId = ({driverId, data}) => {
 const filterResults = [];
 data.map(resultLine => {
  if (resultLine.driverId == driverId) {
   filterResults.push(resultLine);
  }
 });
 return filterResults;
};
const filterResultsByRaceId = ({raceId, data}) => {
 const filterResults = [];
 data.map(resultLine => {
  if (resultLine.raceId == raceId) {
   filterResults.push(resultLine);
  }
 });
 return filterResults;
};
const filterByDriverIdAndRace = ({driverId, raceId, data}) => {
 const filterList = [];
 data.map(resultLine => {
  if (resultLine.driverId == driverId && resultLine.raceId == raceId) {
   filterList.push(resultLine);
  }
 });
 return filterList;
};
const calculateAverageLapTime = resultLine => {
 let minutes=1;
 minutes = convertTimeToMinutes(resultLine.time);
 const averageMinutes = minutes / resultLine.laps;
 const averageTime = convertMinutesToTime(averageMinutes);
 return averageTime;
};
const getSlowestLap=data=>{
  if(!data[0]){return 0}
  let slowestlap=data[0].time;
  data.forEach(resultLine=>{
    const resultSplit=resultLine.time.split(":")
    const resultminutes=resultSplit[0]
    const resultseconds=resultSplit[1]
    //
    const slowestSplit=slowestlap.split(":")
    const slowestminutes=slowestSplit[0]
    const slowestseconds=slowestSplit[1]
    //
    if(slowestminutes===resultminutes&&resultseconds>slowestseconds){slowestlap=resultLine.time}
    else if(slowestminutes<resultminutes){slowestlap=resultLine.time}
  })
  return slowestlap
}
const getSlowestPitStops=data=>{
  if(!data[0]){return 0}
  let slowestlap=data[0].duration;
  data.map(resultLine=>{
     if(slowestlap<resultLine.duration){slowestlap=resultLine.duration;}
  })
  return slowestlap
}
const getFastestPitStops=data=>{
  if(!data[0]){return 0}
  let fastestlap=data[0].duration;
  data.map(resultLine=>{
     if(fastestlap>resultLine.duration){fastestlap=resultLine.duration}
  })
  return fastestlap
}
const getCircuitByRace=({data,raceId})=>{
  let id =""
  data.map(resultLine=>{
     if(resultLine.raceId==raceId){id=resultLine.circuitId;return}
  })
  return id;
}
const getCircuitNameById=({data,circuitId})=>{
  if(!data[0]){return "null"}
  let name=""
  data.map(resultLine=>{
     if(resultLine.circuitId===circuitId){name= resultLine.name;return}
  })
  return name
}
const getFirstAndLastName=({driverId,data})=>{
  if(!data[0]){return "null"}
  let firstName="";
  let lastName=""
  data.map(resultLine=>{
     if(resultLine.driverId==driverId){firstName=resultLine.forename;lastName=resultLine.surname;return}
  })
  return {firstName,lastName}
}
const getLists= async ()=>{
  const unfilteredResults = await csvToJson("results");
  const unfilteredLapTimes= await csvToJson("lap_times");
  const unfilteredPitStops= await csvToJson("pit_stops");
  const racesList= await csvToJson("races");
  const circuitList= await csvToJson("circuits");
  const driversList= await csvToJson("drivers");
  const lists={unfilteredResults,unfilteredLapTimes,unfilteredPitStops,racesList,circuitList,driversList}
  return lists;
}
module.exports = {
  filterResultsByDriverId,
  calculateAverageLapTime,
  filterByDriverIdAndRace,
  getSlowestLap,
  getFastestPitStops,
  getSlowestPitStops,
  getCircuitNameById,
  getFirstAndLastName,
  convertTimeToMinutes,
  getCircuitByRace,
  getLists
  }
