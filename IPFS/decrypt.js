// import readline module
const readline = require("readline");
const { exec } = require("child_process");

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



  
const CryptoJS= require('crypto-js');

const cfg = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };

  const EncyptionRel = {
    Decryption: function(encryptedBase64, key) {
        const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
        if (decrypted) {
        try {
            console.log(decrypted);
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
            return str;
            } else {
            return 'error 1';
            } 
        } catch (e) {
        return 'error 2';
      }
    }
    return 'error 3';
    }
    
  }


// create empty user input
let name = "";
let country = "";

// question user to enter name
rl.question('Enter Encrypted Hash  :  ', function (name) {
    rl.question('Enter private Key : ', function (country) {
      console.log(name,country);
      decryptedHashValue= CryptoJS.AES.decrypt(name.toString(),country.toString()).toString(CryptoJS.enc.Utf8);
      console.log(decryptedHashValue);
      str = "ipfs get "+decryptedHashValue
      console.log(`${name}, key: ${country}`);
      exec(str, (error, stdout, stderr) => {
          console.log(stdout);
        });
      rl.close();
    });
  });
  
   
