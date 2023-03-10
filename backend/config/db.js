const mongoose=require('mongoose')
mongoose.set('strictQuery', false);

const connectDb= async() =>{
    mongoose.connect("mongodb://Udayakumar:vaishu@ac-iwdb4vr-shard-00-00.zwup5ym.mongodb.net:27017,ac-iwdb4vr-shard-00-01.zwup5ym.mongodb.net:27017,ac-iwdb4vr-shard-00-02.zwup5ym.mongodb.net:27017/?ssl=true&replicaSet=atlas-x1g3w0-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log('connected')
    }
})
}
module.exports=connectDb;