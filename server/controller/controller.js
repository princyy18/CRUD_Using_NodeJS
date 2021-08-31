var userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "content can't be empty" });
    return;
  }

  //new user
  const user = new userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in db
  user
    .save(user)
    .then((data) => {
        res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while creating new data in db",
      });
    });
};

//retrieve and return all users/retrieve single user
exports.find = (req, res) => {
    if(req.query.id)
    {
        const id=req.query.id;
        userdb.findById(id)
        .then(data=>
            {
                if(!data)
                {
                    res.status(404).send({message:`not found user`})
                }
                else{
                    res.send(data);
                }
            })
            .catch(err=>
                {
                    res.status(500).send({message:`error retrieving user with`})
                })
    }
    else
    {
    userdb
    .find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured",
      });
    });
    }
};

//update a new identified user by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: `data nthi` });
  }

  const id = req.params.id;
  userdb
    .findByIdAndUpdate(id, req.body, {useFindAndModify:false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `not found data by id` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "some error in update operation" });
    });
};

//delete users with specifies user id in request
exports.delete = (req, res) => {
    const id=req.params.id;

    userdb.findByIdAndDelete(id)
    .then(data=>
        {
            if(!data)
            {
                res.status(400).send({ message: `data is not found`})
            }else
            {
                res.send({
                    message:`data deleted sucessfully`
                })
            }
        })
        .catch(err=>
            {
                res.status(404).send({message:`some error ocurred in data`})
            });
};
