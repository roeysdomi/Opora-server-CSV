const csv=require('csvtojson')



exports.csvToJson=(filename)=>
{
  const path2 =__dirname+`\\CSVfiles\\${filename}.csv`
  const path ='../../handleCsv/CSVfiles/results.csv'
  return csv()
  .fromFile(path2)
  .then((jsonObj)=>{return jsonObj })
  .catch((err)=>{return  err})

}
