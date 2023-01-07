const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const cors = require("cors");

const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const Store = require("./models/Store");
const Cart = require("./models/Cart");
const fileupload = require("express-fileupload");

const backendApp = express();

backendApp.use(fileupload());
backendApp.use(cors());
backendApp.use(express.json());
backendApp.use(express.urlencoded({ extended: true }));

dotenv.config({ path: "./.env" });

const connectDB = require("./db.js");
const { url } = require("inspector");

connectDB();

const server = backendApp.listen(5000, function () {
  console.log("backend is working");
});

// for static folder
backendApp.use(express.static(path.join(__dirname, "public")));

backendApp.get("/users", async (req, res) => {
  const results = await User.find();

  res.status(200).json({
    success: true,
    data: results,
  });
});
//******************************************* ACCOUNT MANAGMENT *************************************** */
backendApp.post("/register", async (req, res) => {
  const result = await User.create(req.body);

  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "not registered!",
    });
  }
});

backendApp.post("/login", async (req, res) => {
  const users = await User.find({ email: req.body.email });
  if (users.length === 0) {
    res.status(400).json({
      success: false,
      message: "password or email not correct!",
    });
  }

  if (users[0].password === req.body.password) {
    res.status(200).json({
      success: true,
      data: users[0],
      token: "user_found",
    });
  }
});

// delte account
backendApp.delete("/users/:id", async (req, res) => {
  console.log(req.params.id);
  // find the user store
  const store = await Store.findOne({
    user: mongoose.Types.ObjectId.createFromHexString(req.params.id),
  });

  // delte all the re realted products
  const productsDeleted = await Product.deleteMany({ store: store._id });
  const storeDeleted = await Store.findByIdAndDelete(store._id);

  const result = await User.findByIdAndDelete(req.params.id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "deleted",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "not deleted!",
    });
  }
});

// Product Routes (PRODUCT MANAGEMENT);

backendApp.get("/products", async (req, res) => {
  const products = await Product.find().populate({
    path: "store",
    model: "Store",
  });

  const stores = await Store.find();

  // composing results

  //
  const productsClone = [...products];
  const copy = [];
  productsClone.forEach((p) => {
    let store = p.store.id;

    let newP = {
      id: p.id,
      title: p.title,
      price: p.price,
      img: process.env.SERVER + "/uploads/prod_" + p.id + p.ext,
      store: p.store,
    };

    console.log(newP);
    copy.push(newP);
  });

  res.status(200).json({
    success: true,
    data: copy,
  });
});

// get products by store id
backendApp.get("/products/:storeid", async (req, res) => {
  const products = await Product.find({ store: req.params.storeid });

  //
  const productsClone = [...products];
  const copy = [];
  productsClone.forEach((p) => {
    let newP = {
      id: p.id,
      title: p.title,
      price: p.price,
      img: process.env.SERVER + "/uploads/prod_" + p.id + p.ext,
    };

    console.log(newP);
    copy.push(newP);
  });

  res.status(200).json({
    success: true,
    data: copy,
  });
});

// cratea new product
backendApp.post("/products", async (req, res) => {
  // const product = await Product.create(req.body);

  const products = await Product.find({ store: req.body.store });

  if (products.length === 6) {
    res.status(400).json({
      success: false,
      message: "6 Products arleady found",
    });
    return;
  }

  const product = {
    title: req.body.title,
    price: req.body.price,
    store: req.body.store ? req.body.store : "",
  };
  const file = req.files.file;
  product["ext"] = path.parse(file.name).ext;

  const responseProd = await Product.create(product);

  file.name = `prod_${responseProd._id}${path.parse(file.name).ext}`;
  //update the wth image url
  let imgUrl = process.env.SERVER + "/uploads/" + file.name;
  const res1 = await Product.findByIdAndUpdate(responseProd._id, {
    img: imgUrl,
  });

  file.mv(`./public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({
      success: true,
      data: responseProd,
    });
  });

  // file saving logic
});
// delete product
backendApp.delete("/products/:id", async (req, res) => {
  console.log(req.params.id);
  const result = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "done",
  });
});

//******************************************* STORE MANAGMENT *************************************** */

backendApp.get("/stores", async (req, res) => {
  try {
    const stores = await Store.find();
    const products = await Product.find().populate({
      path: "store",
      model: "Store",
    });

    const storesClone = [...stores];
    const productsClone = [...products];
    storesClone.map((store) => {
      let sProducts = [];
      productsClone.forEach((p) => {
        const pClone = { ...p._doc };

        pClone["img"] =
          process.env.SERVER + "/uploads/prod_" + pClone._id + pClone.ext;
        console.log(pClone);
        if (p.store.id === store.id) {
          sProducts.push(pClone);
        }
      });

      store["products"] = [...sProducts];
      return store;
    });

    res.status(200).json({
      success: true,
      data: storesClone,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//  Create a STore
backendApp.post("/stores", async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (user) {
      // chck if store exis arleady
      const found = await Store.findOne({ user: user.id });
      if (found) {
        res.status(400).json({
          success: false,
          message: "Store arleady exists",
        });
        return;
      }
      const store = await Store.create(req.body);

      if (store) {
        res.status(200).json({
          success: true,
          data: store,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User Not found",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "User Not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/// get single STore
backendApp.get("/stores/:userid", async (req, res) => {
  const user = await User.findById(req.params.userid);
  if (user) {
    const store = await Store.findOne({ user: user.id });

    if (store) {
      // products in the store
      const products = await Product.find({ store: store.id });
      store["products"] = [...products];
      res.status(200).json({
        success: true,
        data: store,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Store not found",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "User Not found",
    });
  }
});

// update store name
/// get single STore
backendApp.put("/stores/:id", async (req, res) => {
  for (let i = 0; i < 100000; i++) {
    console.log(i);
  }
  const updated = await Store.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (updated) {
    res.status(200).json({
      success: true,
      data: updated,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "not updated!",
    });
  }
});

/// CARTS MANAGEMENT

backendApp.post("/cart", async (req, res) => {
  const found = await Cart.findOne({ user: req.body.user });
  if (found) {
    console.log("yes");
    found.products.push(req.body.product._id);
    await found.save();
  } else {
    console.log("no");
    const products = [];
    products.push(req.body.product._id);
    const result = await Cart.create({
      user: req.body.user,
      products: products,
    });
    if (result) {
      res.json({
        success: true,
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: "no success",
      });
    }
  }
  return;
});

// Handle unhandles promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log("Error: " + err.message);

  server.close(() => process.exit(1));
});
