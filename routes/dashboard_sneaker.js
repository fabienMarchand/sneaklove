const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const User = require("../models/User");
const uploader = require("../config/cloudinary");


router.get("/prod-add", async (req, res)=> {
    const tags = await Tag.find({});
    res.render("products_add.hbs", {tags});
  });
  
  router.post("/prod-add",  uploader.single("images") ,async(req, res) => {
    try {
      const newSneaker = req.body;
      console.log("<<<<<<<<<<<<",newSneaker, ">>>>>>>>>>>>>>>>>>>>>");
      console.log("<<<<<<<<<<<<",req.file, ">>>>>>>>>>>>>>>>>>>>>");

      const newLabel = req.body;
      if (req.file) {
        newLabel.img = req.file.path;
      }


      const createdSneaker = await Sneaker.create(newSneaker);
      res.redirect("/db/prod-manage");
    } catch (error) {
      next(error); 
    }
  });
  
  router.post("/prod-add-cat", async (req, res, next)=> {
    try {
      const newTag = req.body;
      const createdTag = await Tag.create(newTag);
       res.redirect("/db/prod-add");
    } catch (error) {
      next(error);
    }
  });
  
  router.get("/prod-manage", async (req, res)=> {
    const sneakers = await Sneaker.find({});
    res.render("products_manage.hbs", {sneakers});
  });
  
  router.get("/product-delete/:id", async (req, res, next) => {
    try {
      const sneakerId = req.params.id;
      await Sneaker.findByIdAndDelete(sneakerId);
      res.redirect("/db/prod-manage");
    } catch (error) {
      next(error);
    }
  });
  
  router.get("/", (req, res) => {
   // res.send("foo");
   res.render("index.hbs");
  });
  
  router.get("/prod-add", async (req, res)=> {
    const tags = await Tag.find({});
    res.render("products_add.hbs", {tags});
  });
  
  router.post("/prod-add", async (req, res, next)=> {
    try {
      const newSneaker = req.body.console;
      const createdSneaker = await Sneaker.create(newSneaker);
       res.redirect("/db/prod-manage");
    } catch (error) {
      next(error);
    }  
  });
  
  router.post("/prod-add-cat", async (req, res, next)=> {
    try {
      const newTag = req.body;
      const createdTag = await Tag.create(newTag);
       res.redirect("/db/prod-add");
    } catch (error) {
      next(error);
    }  
  });
  router.get("/prod-manage", async (req, res)=> {
    const sneakers = await Sneaker.find({});
    res.render("products_manage.hbs", {sneakers});
  });
  

  router.post("/product-edit/:id", async (req, res, next) => {
    try {
      const sneakerId = req.params.id;
      const newSneakerValues = req.body;
      await Sneaker.findByIdAndUpdate(sneakerId, newSneakerValues);
      res.redirect("/db/prod-manage");
    } catch (error) {
      next(error);
    }
  });

  router.get("/product-edit/:id", async (req, res) => {
    try {
      const sneakerDocuments = await Sneaker.findById(req.params.id);
      const tagDocuments = await Tag.find();

    //  const toto = await (await Sneaker.findById(req.params.id)).populate("Tag");

      // console.log(labelDocuments);
      res.render("product_edit.hbs", {
        sneaker: sneakerDocuments,
        tags: tagDocuments,
      });
    } catch (error) {
      next(error);
    }
  });


module.exports = router;