
module.exports={
    Alphabetical:/^[A-Za-záéíóúÁÉÍÓÚÄÖÜüöÀàÂâĞğÇçÔôŒœÈèÊêËëÆæÙùÛûŸÿ ]+$/,
    OneToOneHundred:/^[1-9][0-9]?$|^122$/,
    Gender: /^(female||male)$/i,
    Email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}