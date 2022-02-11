// AWS KMS - Key Management Service 
// For *encrypting* and storing secrets
//
// do NOT run this on the server.. only run it locally
//
// you must replace these values with your own AWS KEY/SECRET to work
// accessKeyId: 'AK****************AK',
// secretAccessKey: 'AK************************************AK'
//
//  Run Locally
// > node encrypt.js


const { KMSClient, EncryptCommand, DecryptCommand } = require("@aws-sdk/client-kms");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const dotenv = require('dotenv');
const envExpand = require('dotenv-expand')
​
const env = envExpand(dotenv.config({ 
    path: '.env.testnet'
  })).parsed
  
​
const client = new KMSClient({
  // credentials: fromIni({profile: 'kms_user'}),
  credentials: {
    accessKeyId: 'AK****************AK',
    secretAccessKey: 'AK************************************AK'
  },
  region: "us-west-2"
});
​
// You will need to change this VARIABLE
// this is your AWS public KMS store location key
const KeyId = 'arn:aws:kms:us-west-2:461953590500:key/5cf5fe14-c4ce-46ee-9a0b-8c2397dd8a01';

//
// This is the line you need to change to encrypt
   const encryptionString = new Buffer.from('MySecretPasswordHere');
//
// This is a example how you can decrpyt to test as well
// const decryptionString = JSON.parse('{"0":1,"1":2,"2":2,"3":0,"4":120,"5":88,"6":170,"7":39,"8":159,"9":182,"10":180,"11":16,"12":51,"13":205,"14":248,"15":57,"16":115,"17":172,"18":28,"19":246,"20":180,"21":243,"22":202,"23":161,"24":87,"25":185,"26":205,"27":135,"28":96,"29":240,"30":86,"31":116,"32":142,"33":58,"34":62,"35":81,"36":126,"37":1,"38":192,"39":85,"40":68,"41":0,"42":39,"43":103,"44":233,"45":242,"46":203,"47":130,"48":89,"49":132,"50":11,"51":121,"52":102,"53":204,"54":0,"55":0,"56":0,"57":112,"58":48,"59":110,"60":6,"61":9,"62":42,"63":134,"64":72,"65":134,"66":247,"67":13,"68":1,"69":7,"70":6,"71":160,"72":97,"73":48,"74":95,"75":2,"76":1,"77":0,"78":48,"79":90,"80":6,"81":9,"82":42,"83":134,"84":72,"85":134,"86":247,"87":13,"88":1,"89":7,"90":1,"91":48,"92":30,"93":6,"94":9,"95":96,"96":134,"97":72,"98":1,"99":101,"100":3,"101":4,"102":1,"103":46,"104":48,"105":17,"106":4,"107":12,"108":109,"109":249,"110":200,"111":110,"112":127,"113":213,"114":68,"115":121,"116":244,"117":204,"118":52,"119":82,"120":2,"121":1,"122":16,"123":128,"124":45,"125":222,"126":30,"127":49,"128":214,"129":33,"130":44,"131":216,"132":135,"133":111,"134":78,"135":137,"136":214,"137":60,"138":124,"139":222,"140":130,"141":159,"142":120,"143":149,"144":159,"145":38,"146":16,"147":106,"148":56,"149":132,"150":135,"151":239,"152":155,"153":243,"154":215,"155":0,"156":148,"157":202,"158":208,"159":36,"160":254,"161":93,"162":72,"163":203,"164":73,"165":222,"166":226,"167":227,"168":55,"169":99}');

const decryptionString = new Uint8Array(env.MINTER_PRIVATE_KEY.split(','))
console.log(decryptionString)
const arr = new Uint8Array(Object.values(decryptionString));
console.log(arr)
// return
const command = new EncryptCommand({ KeyId, Plaintext: encryptionString });
// const command = new DecryptCommand({CiphertextBlob: decryptionString});
​
const test = async () => {
  try {
    const result = await client.send(command);
    console.log(result.KeyId)
    return result.KeyId;
  } catch (err) {
    console.log("ERROR");
  }
}
​
const a = test();
console.log('a = ', a)
  // .then()
  // .catch(err => console.log(err));
​
// client.send(command, (err, data) => {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   console.log(data.CiphertextBlob.toString('base64'))
//   // console.log(String.fromCharCode.apply(null, new Uint16Array(data.Plaintext)))
// });
