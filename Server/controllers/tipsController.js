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

exports.addTip = async (req, res) => {
  try {
    const data = req.body;
    console.log('Received tip data:', data);
    // handle uploaded image if present
    const tip = new TipsModel(data);
    await tip.save();
    console.log('tip saved:', tip);
    res.json(tip);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "There was an error, try again later", err });
  }
};