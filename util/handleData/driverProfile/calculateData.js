const {csvToJson} = require("../../handleCsv/readCSV");
const {
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
  }=require("./calcFunctions")
const calculatesForDriver =  ({driverId,lists}) => {

   let {unfilteredResults,unfilteredLapTimes,unfilteredPitStops,racesList,circuitList,driversList}=lists
   let counter=0;
 try {

  const driverProfileList=[]
  const filteredResult = filterResultsByDriverId({driverId: driverId,data: unfilteredResults});
  filteredResult.some( (resultLine)=>{
    if(counter==1){return;}
   const fastestLapTime=resultLine.fastestLapTime
   const points=resultLine.points
   const position=resultLine.position
   const averageLapTime = calculateAverageLapTime(resultLine);
   const filteredLapTimes=filterByDriverIdAndRace({driverId:driverId,raceId:resultLine.raceId,data:unfilteredLapTimes})
   const slowestLap=getSlowestLap(filteredLapTimes)
   const filteredPitStops=filterByDriverIdAndRace({driverId:driverId,raceId:resultLine.raceId,data:unfilteredPitStops})
   const fastestPitStops=getFastestPitStops(filteredPitStops)
   const slowestPitStops=getSlowestPitStops(filteredPitStops)
   const circuitId=getCircuitByRace({data:racesList,raceId:resultLine.raceId})
   const circuitName=getCircuitNameById({data:circuitList,circuitId:circuitId})
   const fullName=getFirstAndLastName({driverId:driverId,data:driversList})
  const driverProfilePerRace={
     slowestLap,
     fastestLapTime,
     points,position,
     fastestPitStops,
     slowestPitStops,
     raceId:resultLine.raceId,
     driverId:driverId,
     circuitId,
     circuitName,
     firstName:fullName.firstName,
     lastName:fullName.lastName
   }

   driverProfileList.push(driverProfilePerRace)
   counter++;
  })
    return driverProfileList
 } catch (err) {
   console.log(err)
  return err;
 }
};
const calculatesForAllDriveres=async()=>{
  try{
    let lists=await getLists()
    let allDriversProfile=[]
    let test=await "bla"
    const driversList= await csvToJson("drivers");
     driversList.map( (driver)=>{
      const driverRacesList= calculatesForDriver({driverId:driver.driverId,lists:lists})
      allDriversProfile.push(...driverRacesList)

    })

    await console.log(allDriversProfile.length)
  }catch(err)
  {
    console.log(err)
    return err;
  }

}
calculatesForAllDriveres();
