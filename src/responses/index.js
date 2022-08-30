module.exports.OK = ({ data=null ,path, message = ''})=>{

  return {
    status: 'success',
    code: 200,
    path,
    data,
    message
  }
  
}

module.exports.BAD_REQUEST = ({ data=null,error,path,message = ''})=>{

  return {
    status: 'fail',
    code: 400,
    path,
    error,
    message,
    data
  }
  
}