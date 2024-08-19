const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
 

dotenv.config();

exports.auth=async(req,res,next)=>{
    try {
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")


                    //    console.log(token)

             if(!token){
                return res.status(401).json({
                    success:false,
                    message:"token available nii hai"
                })
             }    

             //verify token
             
             try {
                const decodedJwt=await jwt.verify(token,"SCHOOL")

                // console.log(decodedJwt)

                req.user=decodedJwt
                // console.log(req.user)
             } catch (error) {
                return res.status(401).json({
                    success:false,
                    message:"jwt verification nii ho paya in middleware , token is invalid"
                })
             }

             next();

    } catch (error) {
        // console.log(error.message)
        return res.status(401).json({
            success:false,
            message:"token parse nii hua hai aur req.user set nii hua while validating token in middleware"
        })
    }
}
