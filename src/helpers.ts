export const convertByTypeForDB = (value) => {

  let val: any; 
  if(typeof value === "object" || typeof value === "boolean"){
    val = JSON.stringify(value) 
  }else if(typeof value === 'string'){
    val = value.trim();
  }else{
    val = value;
  }
  return val;
  
}

export const convertByTypeFromDB = (value) => {
  try{
    return JSON.parse(value);
  }catch(err){
    return isNaN(Number(value)) ? value : Number(value);
  }
}


