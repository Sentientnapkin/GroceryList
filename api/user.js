import client from "../lib/sanity/client";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      //this JSON arrives as a string,
      //so we turn it into a JS object with JSON.parse()
      const newUser = await JSON.parse(req.body);
      //then use the Sanity client to create a new user doc
      try {
        await client
          .create({
            _type: "user",
            userName: newUser.userName,
            email: newUser.user,
            password: newUser.password,
          })
          .then((res) => {
            console.log(`User was created, document ID is ${res._id}`);
          });
        res
          .status(200)
          .json({ msg: `User was created, document ID is ${res._id}` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }

      break;
  }
}