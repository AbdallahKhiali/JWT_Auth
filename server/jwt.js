// const jwt = require('jsonwebtoken');

// // On exporte une fonction qui va checker si le token est valide
// module.exports = async  function checkToken (req, res, next) {
//     // On récupère le token depuis la requête : req.headers.token ou req.headers['token']
//     const token = await req.headers.cookie.split('=')[1];
//     // console.log('token generée de cookie :'+token_cookie)
//     // Si le token existe et n'est pas vide
//     if (token) {
//         // On essaye de décrypter le token, en utilisant jwt.verify(payload, private_key, [options,callback] )
//         jwt.verify(token, 'secret_key', (err, decode) => {
//             //  Si il y a une erreur dans le décryptage on la retourne
//             if (err) {
//                 res.json({
//                     "status": 500,
//                     "message": "INVALID TOKEN",
//                     "error": err
//                 });
//             } else {
//                 // Sinon on passe au middleware prochain
//                 next();
//             }
//         })
//     } else {
//         // Si le token n'existe pas , on retourne une erreur
//         res.json({
//             "status": 500,
//             "message": "NO TOKEN PROVIDE",
//             "error": "token must be provide in header for endpoint access"
//         });
//     }
// }

const jwt = require('jsonwebtoken');

module.exports = async  function checkToken (req, res, next) {
    
    // const token = await req.headers.cookie.split('=')[1];
    const token = await req.cookies.token;
        console.log(req.cookies)
    if (token) {

try {
    if (jwt.verify(token,'secret_key')) {
        res.send(true)
        next();
    }
    else {
        res.send(false)
        res.status(401).json({message: 'Authentification KO - failed'});
    }
}catch (error) {
    res.status(401).json({message: 'Authentification KO - failed'});
}
}
else {
    res.status(401).json({message: 'Authentification KO - failed'});
}


}