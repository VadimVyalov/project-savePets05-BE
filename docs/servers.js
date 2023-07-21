const { SERVER_URL } = process.env;
console.log(SERVER_URL);
module.exports = {
  servers: [
    {
      url: SERVER_URL,
      description: "Local server",
    },
    {
      url: "https://contacts-4pp6.onrender.com",
      description: "Render.com server",
    },
  ],
};
