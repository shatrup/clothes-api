const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, './images');
  },
  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const Clothes = require('../../schemas/Clothes');

// @route   GET api/clothes
// @desc    fetch clothe description by id
// @access  Private
router.get( '/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Clothes.findOne({title: req.params.title})
      .then(clothe => {
        if (!clothe) {
          return res.status(404).json('There is no clothe title for this user');
        }
        res.json(clothe)
      })
      .catch(err =>  res.status(404).json(err))
  }
);

// @route   POST api/clothes
// @desc    Create or edit user clothes details
// @access  Private
router.post( '/', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
     // Get fields
    const clothesFields = {};
    clothesFields.user = req.user.id;
      if (req.body.title) clothesFields.title = req.body.title;
      if (req.body.clotheType) clothesFields.clotheType = req.body.clotheType;
      if (req.body.size) clothesFields.size = req.body.size;
      if (req.body.color) clothesFields.color = req.body.color;
      if (req.body.createdBy) clothesFields.createdBy = req.body.createdBy;
      if (req.body.sharedTo) clothesFields.sharedTo = req.body.sharedTo;
      if (req.file.filename) clothesFields.image = req.file.filename;
      if (req.body.count) clothesFields.count = req.body.count;

    Clothes.findOne({ title: req.body.title }).then(clothe => {
      if (clothe) {
        // Update
        Clothes.findOneAndUpdate(
          { title: req.body.title },
          { $set: clothesFields },
          { new: true }
        ).then(clothe => res.json(clothe));
      } else {
          // Save Profile
          new Clothes(clothesFields).save().then(clothe => res.json(clothe));
      }
    });
  }
);


// @route   DELETE api/clothes/:id
// @desc    Delete clothes
// @access  Private
router.delete( '/:id',  passport.authenticate('jwt', { session: false }), (req, res) => {
    // const {errors, isValid} = validateExperienceInput(req.body);
      Clothes.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
);



module.exports = router;