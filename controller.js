const UserModel = require("./Models/User");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw {
        message: "Please enter valid data",
      };
    }

    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      throw {
        message: "User already exists",
      };
    }

    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    user = await UserModel.create({
      email: req.body.email,
      name: req.body.name,
      password: secPass,
    });

    let data = {
      id: user._id,
      email: user.email,
    };

    jwtOptions = { expiresIn: "720h" };

    let authToken = jwt.sign(data, JET, jwtOptions);

    let jwtUserResponse = await UserModel.findByIdAndUpdate(
      user._id,
      { token: authToken },
      { new: true }
    );

    delete jwtUserResponse.token;

    res.status(201).json({
      status: true,
      data: jwtUserResponse,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
      data: err,
    });
  }
};

const createAgencyAndClient = (req, res) => {
  try {
  } catch (err) {}
};

const updateClient = (req, res) => {
  try {
  } catch (err) {}
};

const getTopClientForAgency = (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  createUser,
  createAgencyAndClient,
  updateClient,
  getTopClientForAgency,
};
