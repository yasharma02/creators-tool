import axios from "axios";
const config = require("./config.js");
const apiURL = config.METADATA_URL;

export const metadataPostToServer = async (form) => {
  try {
    const response = await axios.post(apiURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        // ...form.getHeaders(),
      },
    });
    return {
      responseSuccess: true,
      responseMessage: response.data.message,
      responseCode: response.data.code,
      responseData: response.data.data,
    };
  } catch (error) {
    console.log(error);
    return {
      responseSuccess: false,
      responseMessage: error.message,
      responseCode: null,
      responseData: null,
    };
  }
};

export const metadataGetFromServer = async (userPublicAddress) => {
  const url = `${apiURL}/${userPublicAddress}`;

  try {
    const response = await axios.get(url);
    return {
      responseSuccess: true,
      responseMessage: response.data.message,
      responseCode: response.data.code,
      userArtList: response.data.userArtList,
    };
  } catch (error) {
    console.log(error);
    return {
      responseSuccess: false,
      responseMessage: error.message,
      responseCode: null,
      userArtList: null,
    };
  }
};

export const metadataPutToServer = async (form, id) => {
  const url = `${apiURL}/${id}`;

  try {
    const response = await axios.put(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        // ...form.getHeaders(),
      },
    });
    return {
      responseSuccess: true,
      responseMessage: response.data.message,
      responseCode: response.data.code,
      responseData: response.data.data,
    };
  } catch (error) {
    console.log(error);
    return {
      responseSuccess: false,
      responseMessage: error.message,
      responseCode: null,
      responseData: null,
    };
  }
};
