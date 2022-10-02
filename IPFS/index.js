// const fs=require('fs')
const CryptoJS = require('crypto-js');
const { exec } = require("child_process");
const { Console } = require('console');

exec("ipfs add /home/pooshpal/Documents/KYC_Blockchain/KYC/uploads -r", (error, stdout, stderr) => {
   
    console.log(stdout);
    const result = stdout.split('\n');
    len = result.length;
    console.log(result[len-2])
    temp = result[len-2]
    str=""
for(var i =0;i<temp.length;i++)
{str+=temp[i]

}
//console.log("str=")

    str = str.split(' ')[1] 
    console.log("answer",str)// this is the hash value
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
     
       }
       return result;
    }
    privateKeyGenerated=makeid(10);

    console.log("Private Key ->")
    console.log(privateKeyGenerated);
    var storeInBlockchain=""
    storeInBlockchain= CryptoJS.AES.encrypt(str,privateKeyGenerated).toString();
    console.log("Encrypted Hash->")

    console.log(storeInBlockchain)
    confirmDecryption= CryptoJS.AES.decrypt(storeInBlockchain,privateKeyGenerated).toString(CryptoJS.enc.Utf8);
    //console.log("->")

    console.log(confirmDecryption)
    console.log("Flushing Data")
    exec("rm /home/pooshpal/Documents/KYC_Blockchain/KYC/uploads/*", (error, stdout, stderr) => {
      console.log(stdout)
      
});})
