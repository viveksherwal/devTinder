const userauth= (req,res,next)=>{
    console.log("user auth is getting checked!!");
    const token = "xyz";
    const isAdimAuthorised = token=="xyz";
    if(!isAdimAuthorised){
        res.status(401).send("unauthorrized request");
    }
    else{
        next();
    }
};

const adminauth= (req,res,next)=>{
    console.log("admin auth is getting checked!!");
    const token = "xyz";
    const isAdimAuthorised = token=="xyz";
    if(!isAdimAuthorised){
        res.status(401).send("unauthorrized request");
    }
    else{
        next();
    }
};

module.exports  = {
    adminauth,
    userauth
}