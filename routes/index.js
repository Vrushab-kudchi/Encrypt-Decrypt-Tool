const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Encryption & Decryption Tool', encryptedMessage: '', decryptedMessage: '' });
});

router.post('/encrypt', function(req, res) {
  const secretKey = req.body.secretKey;
  const plaintext = req.body.plaintext;

  const encryptedMessage = crypto.AES.encrypt(plaintext, secretKey).toString();
  res.render('index', { title: 'Encryption & Decryption Tool', encryptedMessage: encryptedMessage, decryptedMessage: '' });
});

router.post('/decrypt', function(req, res) {
  const secretKey = req.body.secretKeyDecrypt;
  const encryptedMessage = req.body.encryptedMessage;

  try {
    const bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(crypto.enc.Utf8);
    res.render('index', { title: 'Encryption & Decryption Tool', encryptedMessage: encryptedMessage, decryptedMessage: decryptedMessage });
  } catch (error) {
    res.render('index', { title: 'Encryption & Decryption Tool', encryptedMessage: encryptedMessage, decryptedMessage: 'Decryption failed. Please check your Secret Key and Encrypted Message.' });
  }
});

module.exports = router;
