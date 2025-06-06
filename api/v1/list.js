export default function handler(req, res) {
  const endpoints = [
    {
      path: "/api/time",
      description: "Returns the current server time."
    },
    {
      path: "/api/encode",
      description: "Encodes provided content into Base64."
    },
    {
      path: "/api/color",
      description: "Get any color information, custom hex color code can be input."
    },
    {
      path: "/api/emoji",
      description: "Get specified or random emoji info."
    },
    {
      path: "/api/list",
      description: "Retrieves a list of all available endpoints."
    }
  ];

  res.json({
    message: "All Available API endpoints, made by harys722.",
    base_url: "https://harys.is-a.dev",
    endpoints: endpoints
  });
}
