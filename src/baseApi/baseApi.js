import { axiosCustom } from "../customAxios/axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// get Data
export const getData = async (url, token, queryParams = {}) => {
  try {
    const response = await axiosCustom.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      params: queryParams
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

// add Data
export const addData = async (
  url,
  token,
  data
) => {
  try {
    const response = await axiosCustom.post(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error)
  }
};

// update Data
export const updateData = async (
  url,
  token,
  data,
  queryParams = {}
) => {
  try {
    const response = await axiosCustom.put(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams
    });
    return response?.data;
  } catch (error) {
    console.log(error)


  }
};
// delete Data
export const deleteData = async (
  url,
  token,
  data
) => {
  try {
    const response = await axiosCustom.delete(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response?.data;
  } catch (error) {
    console.log(error)
  }
};
