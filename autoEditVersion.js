const fs = require('fs');
const path = require('path');

const editVersionBuild = (version) => {
  let chunkVersion = version.split('.');

  let copyChunkVersion = [...chunkVersion];
  let firstValueVersion = chunkVersion[0];
  let middleValueVersion = chunkVersion[1];
  let endValueVersion = chunkVersion[2];

  let newVersion = [];
  if(Number(endValueVersion) >=  100){
    newVersion = [firstValueVersion, (+middleValueVersion + 1).toString(), (1).toString()];
    
  }else{
    newVersion = [firstValueVersion, middleValueVersion, (+endValueVersion + 1).toString()]
  }
  return newVersion.join('.');
}



const setVersionBuild = () => {

  let pathFilePackageJson = path.resolve(__dirname, 'package.json');

  fs.readFile(pathFilePackageJson, (err, data) => {
    if(!err){
      
      let packageJson = JSON.parse(data.toString());
      let version = editVersionBuild(packageJson.version);
      let updateVersionPackageJson = JSON.stringify({...packageJson, version}, null, ' ');
      fs.writeFileSync(pathFilePackageJson, updateVersionPackageJson);
    }
  })

}

setVersionBuild();


