const {TipsModel} = require("../models/tipsModel");

exports.getAllTips = async (req, res) => {
  try {
    let tips = await TipsModel.find({});
    res.json(tips);
    } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "There was an error, try again later", err });
  }
};