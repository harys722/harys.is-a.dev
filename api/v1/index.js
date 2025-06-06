export default function handler(req, res) {

  res.json({
    success: "false",
    error: "The requested resource does not exist",
    message:"Make sure you are sending a request to a valid endpoint or web-page",
    info: {
      credits: "Made by harys722, available only for cool people.",
      support: "https://harys.is-a.dev/api"
    }
  });
}
