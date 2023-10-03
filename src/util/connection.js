const sql = require('./sqlz');

const cekKoneksi = () =>{
    return new Promise(async(resolve, reject) =>{
        try {
            await sql.authenticate();
            resolve(true);
        } catch (error) {
            resolve(error);
        }
    })
}

module.exports={
    cekKoneksi
}