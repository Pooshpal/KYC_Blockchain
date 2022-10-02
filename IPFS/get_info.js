
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

document.querySelector("#myFormExistUser").addEventListener("keyup", function(){
    var data = {};
    var inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    document.querySelector("#text").innerText = JSON.stringify(data); 
});
document.querySelector("#myFormExistUser").dispatchEvent(new Event('keyup'));

(function () {
    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
      params = params || { bubbles: true, cancelable: true, detail: undefined };
      var evt = document.createEvent('submit');
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
     }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;

})();
var evt = new CustomEvent("submit", {"bubbles":true, "cancelable": true});
document.getElementById("myFormExistUser").addEventListener("submit",function(event) {
      event.preventDefault();
      alert('submit');
      console.log(web3.eth.getTransaction(data["transactionId"]))
      var tx =  web3.eth.getTransaction(data["transactionId"], function(err, transactionHash) {
      if (!err)
          console.log(transactionHash); 
      })

      console.log(tx)
      document.getElementById("temp").innerHTML = EncyptionRel.Decryption.call(tx.address, data["private_key"]); 
      decryptedHashValue=EncyptionRel.Decryption.call(tx.address, data["private_key"]);
      var accounts = web3.eth.getAccounts();

      console.log(accounts);
      console.log("Trying to fetch data");
      const {exec}=require("child_process");
        hash=decryptedHashValue
        str='cd .. && ipfs get '+hash;
        exec(str,(error,stdout,stderr) => {

        });
    console.log("Data fetched successfully.")
                    //.on('click', App.toggleCompleted)
});


