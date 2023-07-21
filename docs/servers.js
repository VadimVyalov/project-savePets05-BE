const { SERVER_URL } = process.env;
console.log(SERVER_URL);
module.exports = {
  servers: [
    {
      url: SERVER_URL,
      description: "Local server",
    },
    {
      url: "https://project-savepets05-be.onrender.com",
      description: "Render.com server",
    },
  ],
};
