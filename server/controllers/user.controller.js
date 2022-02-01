const jwt = require('jsonwebtoken');
const userModel = require('../users.model')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

const getusers = async (req,res)=>{
    userModel.find().then(data=>res.json(data)).catch(err=>console.log(err))
}


const createuser =  async (req,res)=>{
        const { name,email,password} = req.body
        userModel.findOne({email:email,name:name},(err,user)=>{
            if(user){
                res.json('user already exist')
            }else{
                    bcrypt.hash(password,16,(err,hash)=>{
                        let user = new userModel({
                            name: name,
                            email:email,
                            password:hash,
                        })
                        user.save().then(user=>res.json({message:'user added successfully',user})).catch(err=>res.json(err))
                       
                    })
                }
      })

}


// const login  = async  (req,res)=>{

//     const  {email,password}= await req.body

//     userModel.findOne({email:email},((err,user)=>{
//         if(err) throw err 
//         if(user) {
//                 const {password} = user
//                 bcrypt.compare(password,user.password,(req,res)=>{
//                     const token = jwt.sign({
//                         login: user.login,
//                         name: user.name
//                     },'secret_key', {expiresIn: '24h'})

//                 //    res.cookie('token',token,{httpOnly:true})
//                     res.json({
//                         message:'user logged successfully',
//                         token: token,
//                         user:user
//                     })

//                 })
            
//         } else {
//             res.send({message: "User not registered"})
//             }
        
//     }))
// }
// 

const login=(req,res)=>{
    var { email, password } = req.body

    // On vérifie si l'utilisateur existe bien avec cet email
    userModel.findOne({ email: email }).then(result => {
        // si le résultat est un object vide " {} ", on retourne une erreur
        if (Object.keys(result).length == 0) {
            res.json({
                message: "L'utilisateur n'existe pas, vérifier votre addresse email"
            })
        } else {
            // Sinon on compare le password entré, et le password existant dans la bdd
            bcrypt.compare(password, result.password, (err, same) => {
                if (err) res.json(err)
                // Si les password ne sont pas pareil, retourner une erreur
                if (!same) res.json({ message: "email or password wrong" })
                // Sinon , retourner le user et un message de bienvenu

                // 
                jwt.sign(email, 'secret_key', (err, token) => {
                    console.log(token)
                    if (err) res.json(err)
                    res.cookie('token',token,{httpOnly:true}).json({ user: result, message: "Vous êtes bien connecté", token: token })
                })

            })
        }

    }).catch(err => {
        res.json(err)
    })

}

const logout = async (req,res)=>{
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
}



module.exports={login,createuser,getusers,logout}