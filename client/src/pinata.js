//require('dotenv').config();
// const key = process.env.REACT_APP_PINATA_KEY;
// const secret = process.env.REACT_APP_PINATA_SECRET;

const axios = require("axios");
const FormData = require("form-data");

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: "fbe7608a982a26aab341",
        pinata_secret_api_key:
          "b94fab269f914101aa6b8d34afa9537f4596fd378a0866e754b7b1848ba3bd56",
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  // https://api.pinata.cloud/pinning/pinFileToIPFS
  //making axios POST request to Pinata ⬇️

  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: "fbe7608a982a26aab341",
        pinata_secret_api_key:
          "b94fab269f914101aa6b8d34afa9537f4596fd378a0866e754b7b1848ba3bd56",
      },
    })
    .then(function (response) {
      console.log("image uploaded", response.data.IpfsHash);
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
