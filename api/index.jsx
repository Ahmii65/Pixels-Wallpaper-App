const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
let apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editorschoice=true";
  if (!params) return url;
  const paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    const value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const apicall = async (params) => {
  try {
    const res = await fetch(formatUrl(params));
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.log(err.message);
    return { success: false, msg: err.message };
  }
};
