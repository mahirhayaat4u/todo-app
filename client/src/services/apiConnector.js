 
 import axios from "axios"
export const axiosInstance =axios.create({
    baseURL: "http://localhost:4000",
    
});
 

// export const apiConnector = async (method, url, bodyData, headers, params) => {
//   console.log("Method:", method);
//   console.log("URL:", url);
//   console.log("Body Data:", bodyData);
//   console.log("Headers:", headers);
//   console.log("Params:", params);

//   try {
//       const response = await axiosInstance({
//           method,
//           url,
//           data: bodyData || undefined,
//           headers: headers || undefined,
//           params: params || undefined,
//           withCredentials: true,
//       });
//       return response;
//   } catch (error) {
//       console.error("API Request Error:", error);
//       console.error("Error Response Data:", error.response?.data);
//       console.error("Error Status:", error.response?.status);
//       console.error("Error Headers:", error.response?.headers);
//     //   throw error.response || error;
//   }
// };



export const apiConnector=(method,url,bodyData,headers,params)=>{

//   console.log("Method:", method);
//   console.log("URL:", url);
//   console.log("Body Data:", bodyData);
//   console.log("Headers:", headers);
//   console.log("Params:", params);
  
  return axiosInstance({
      method:`${method}`,
      url:`${url}`,
      data:bodyData ? bodyData:null ,
     headers: headers ? headers : null,
      params:params?params:null,
      withCredentials: true,
  });

  
}