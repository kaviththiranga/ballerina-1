// Copyright (c) 2018 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/crypto;

function testHashWithCRC32b(byte[] input) returns string {
    return crypto:crc32b(input);
}

function testHashWithMD5(byte[] input) returns byte[] {
    return crypto:hashMd5(input);
}

function testHashWithSHA1(byte[] input) returns byte[] {
    return crypto:hashSha1(input);
}

function testHashWithSHA256(byte[] input) returns byte[] {
    return crypto:hashSha256(input);
}

function testHashWithSHA384(byte[] input) returns byte[] {
    return crypto:hashSha384(input);
}

function testHashWithSHA512(byte[] input) returns byte[] {
    return crypto:hashSha512(input);
}

function testHmacWithMD5(byte[] input, byte[] key) returns byte[]|crypto:CryptoError {
    return crypto:hmacMd5(input, key);
}

function testHmacWithSHA1(byte[] input, byte[] key) returns byte[]|crypto:CryptoError {
    return crypto:hmacSha1(input, key);
}

function testHmacWithSHA256(byte[] input, byte[] key) returns byte[]|crypto:CryptoError {
    return crypto:hmacSha256(input, key);
}

function testHmacWithSHA384(byte[] input, byte[] key) returns byte[]|crypto:CryptoError {
    return crypto:hmacSha384(input, key);
}

function testHmacWithSHA512(byte[] input, byte[] key) returns byte[]|crypto:CryptoError {
    return crypto:hmacSha512(input, key);
}

function testSignRsaSha1(byte[] input, string path, string keyStorePassword, string keyAlias, string keyPassword)
                         returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
        keyPassword = keyPassword);
    return crypto:signRsaSha1(input, pk);
}

function testSignRsaSha256(byte[] input, string path, string keyStorePassword, string keyAlias, string keyPassword)
                           returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
        keyPassword = keyPassword);
    return crypto:signRsaSha256(input, pk);
}

function testSignRsaSha384(byte[] input, string path, string keyStorePassword, string keyAlias, string keyPassword)
                           returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
        keyPassword = keyPassword);
    return crypto:signRsaSha384(input, pk);
}

function testSignRsaSha512(byte[] input, string path, string keyStorePassword, string keyAlias, string keyPassword)
                           returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
        keyPassword = keyPassword);
    return crypto:signRsaSha512(input, pk);
}

function testSignRsaMd5(byte[] input, string path, string keyStorePassword, string keyAlias, string keyPassword)
                        returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
        keyPassword = keyPassword);
    return crypto:signRsaMd5(input, pk);
}

function testSignRsaSha1WithInvalidKey(byte[] input) returns byte[]|crypto:CryptoError {
    crypto:PrivateKey pk = {algorithm:"RSA"};
    return crypto:signRsaSha1(input, pk);
}

function testSignRsaSha256WithInvalidKey(byte[] input) returns byte[]|crypto:CryptoError {
    crypto:PrivateKey pk = {algorithm:"RSA"};
    return crypto:signRsaSha256(input, pk);
}

function testSignRsaSha384WithInvalidKey(byte[] input) returns byte[]|crypto:CryptoError {
    crypto:PrivateKey pk = {algorithm:"RSA"};
    return crypto:signRsaSha384(input, pk);
}

function testSignRsaSha512WithInvalidKey(byte[] input) returns byte[]|crypto:CryptoError {
    crypto:PrivateKey pk = {algorithm:"RSA"};
    return crypto:signRsaSha512(input, pk);
}

function testSignRsaMd5WithInvalidKey(byte[] input) returns byte[]|crypto:CryptoError {
    crypto:PrivateKey pk = {algorithm:"RSA"};
    return crypto:signRsaMd5(input, pk);
}

function testEncryptAesEcb(byte[] input, byte[] key, crypto:AesPadding padding) returns byte[]|crypto:CryptoError {
    return crypto:encryptAesEcb(input, key, padding = padding);
}

function testDecryptAesEcb(byte[] input, byte[] key, crypto:AesPadding padding) returns byte[]|crypto:CryptoError {
    return crypto:decryptAesEcb(input, key, padding = padding);
}

function testEncryptAesCbc(byte[] input, byte[] key, byte[] iv, crypto:AesPadding padding)
                           returns byte[]|crypto:CryptoError {
    return crypto:encryptAesCbc(input, key, iv, padding = padding);
}

function testDecryptAesCbc(byte[] input, byte[] key, byte[] iv, crypto:AesPadding padding)
                           returns byte[]|crypto:CryptoError {
    return crypto:decryptAesCbc(input, key, iv, padding = padding);
}

function testEncryptAesGcm(byte[] input, byte[] key, byte[] iv, crypto:AesPadding padding, int tagSize)
                           returns byte[]|crypto:CryptoError {
    return crypto:encryptAesGcm(input, key, iv, padding = padding, tagSize = tagSize);
}

function testDecryptAesGcm(byte[] input, byte[] key, byte[] iv, crypto:AesPadding padding, int tagSize)
                           returns byte[]|crypto:CryptoError {
    return crypto:decryptAesGcm(input, key, iv, padding = padding, tagSize = tagSize);
}

function testEncryptRsaEcb(byte[] input, string path, string keyStorePassword, string keyAlias,
                           crypto:RsaPadding padding) returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:encryptRsaEcb(input, pk, padding = padding);
}

function testDecryptRsaEcb(byte[] input, string path, string keyStorePassword, string keyAlias, string keyPassword,
                           crypto:RsaPadding padding) returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
                                                         keyPassword = keyPassword);
    return crypto:decryptRsaEcb(input, pk, padding = padding);
}

function testEncryptRsaEcbWithPrivateKey(byte[] input, string path, string keyStorePassword, string keyAlias,
                                         string keyPassword, crypto:RsaPadding padding)
                                         returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PrivateKey pk = check crypto:decodePrivateKey(keyStore = keyStore, keyAlias = keyAlias,
                                                         keyPassword = keyPassword);
    return crypto:encryptRsaEcb(input, pk, padding = padding);
}

function testDecryptRsaEcbWithPublicKey(byte[] input, string path, string keyStorePassword, string keyAlias,
                                        crypto:RsaPadding padding) returns byte[]|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:decryptRsaEcb(input, pk, padding = padding);
}

function testEncryptRsaEcbWithInvalidKey(byte[] input, crypto:RsaPadding padding) returns byte[]|crypto:CryptoError {
    crypto:PrivateKey pk = {algorithm:"RSA"};
    return crypto:encryptRsaEcb(padding = padding, input, pk);
}

function testVerifyRsaSha1(byte[] input, byte[] signature, string path, string keyStorePassword, string keyAlias)
                           returns boolean|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:verifyRsaSha1Signature(input, signature, pk);
}

function testVerifyRsaSha256(byte[] input, byte[] signature, string path, string keyStorePassword, string keyAlias)
                             returns boolean|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:verifyRsaSha256Signature(input, signature, pk);
}

function testVerifyRsaSha384(byte[] input, byte[] signature, string path, string keyStorePassword, string keyAlias)
                             returns boolean|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:verifyRsaSha384Signature(input, signature, pk);
}

function testVerifyRsaSha512(byte[] input, byte[] signature, string path, string keyStorePassword, string keyAlias)
                             returns boolean|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:verifyRsaSha512Signature(input, signature, pk);
}

function testVerifyRsaMd5(byte[] input, byte[] signature, string path, string keyStorePassword, string keyAlias)
                          returns boolean|crypto:CryptoError {
    crypto:KeyStore keyStore = {
        path: path,
        password: keyStorePassword
    };
    crypto:PublicKey pk = check crypto:decodePublicKey(keyStore = keyStore, keyAlias = keyAlias);
    return crypto:verifyRsaMd5Signature(input, signature, pk);
}
