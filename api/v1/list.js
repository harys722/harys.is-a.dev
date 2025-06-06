export default function handler(req, res) {
  const endpoints = [
    {
      path: "/api/v1/time",
      description: "Returns the current server time."
    },
    {
      path: "/api/v1/encode",
      description: "Encodes provided content into Base64."
    },
    {
      path: "/api/v1/color",
      description: "Get any color information, custom hex color code can be input."
    },
    {
      path: "/api/v1/emoji",
      description: "Get specified or random emoji info."
    },
    {
      path: "/api/v1/list",
      description: "Retrieves a list of all available endpoints."
    }
  ];

  res.json({
    message: "All Available API endpoints, made by harys722.",
    base_url: "https://harys.is-a.dev/api/v1",
    endpoints: endpoints
  });
}
