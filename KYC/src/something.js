// const fs=require('fs')
const CryptoJS = require('crypto-js');
const { exec } = require("child_process");

exec("cd .. && ipfs add hackathon//uploads2 -r", (error, stdout, stderr) => {
   
    console.log(stdout);
    const result = stdout.split(/\r?\n/);
    len = result.length;
    console.log(result[len-2])
    temp = result[len-2]
    str=""
for(var i =0;i<temp.length;i++)
{str+=temp[i]

}
console.log("str=")
console.log(str)
    var longest;
    var longestWord = "";
    const result2 = stdout.split(' ');
    //console.log(result2)
    var longestWord = "";

  // Step 3. Create the FOR loop
  for(var i = 0; i < result2.length; i++){
    if(result2[i].length > longestWord.length){ // If strSplit[i].length is greater than the word it is compared with...
	longestWord = result2[i]; // ...then longestWord takes this new value
     }
  }
    console.log(longestWord)// this is the hash value
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
    console.log("1->")
    console.log(privateKeyGenerated);
    var storeInBlockchain=""
    storeInBlockchain= CryptoJS.AES.encrypt(longestWord,privateKeyGenerated).toString();
    console.log("2->")

    console.log(storeInBlockchain)
    confirmDecryption= CryptoJS.AES.decrypt(storeInBlockchain,privateKeyGenerated).toString(CryptoJS.enc.Utf8);
    console.log("3->")

    console.log(confirmDecryption)
});

exec("del /s /q  C:\\Users\\anush\\Downloads\\kubo_v0.15.0_windows-amd64\\kubo\\hackathon\\uploads2", (error, stdout, stderr) => {
console.log(stdout)


});