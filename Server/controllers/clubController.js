const { ClubModel } = require("../models/clubModel");
const crypto = require("crypto");

const generateGiftCode = () => {
    const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `GIFT-${randomPart}`;
};

exports.joinClub = async (req, res) => {
    try {
        const { user_id, email, name, birthDate } = req.body;
        const existingMember = await ClubModel.findOne({ user_id });
        if (existingMember) {
            return res.status(200).json({
                msg: "אתה כבר חבר מועדון",
                code: existingMember.personalCode
            });
        }
        const newCode = generateGiftCode();
        const newMember = new ClubModel({
            user_id,
            email,
            name,
            birthDate,
            personalCode: newCode,
            isUsed: false
        });
        await newMember.save();
        res.status(201).json({ msg: "הצטרפת בהצלחה!", code: newCode });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "שגיאה בהצטרפות", err });
    }
};

exports.checkGiftCode = async (req, res) => {
    try {
        const { code } = req.params;
        const member = await ClubModel.findOne({ giftCode: code });
        if (!member) {
            return res.json({ msg: "קוד לא נמצא", valid: false });
        }
        if (member.isUsed) {
            return res.json({ msg: "הקוד הזה כבר נוצל בעבר", valid: false });
        }
        res.json({ msg: "קוד תקין! מגיע לך מתנה", valid: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "שגיאה בבדיקת הקוד", err });
    }
};

exports.redeemGift = async (req, res) => {
    try {
        const { user_id } = req.body;
        const updatedMember = await ClubModel.findOneAndUpdate(
            { user_id, isUsed: false },
            { isUsed: true },
            { new: true }
        );
        if (!updatedMember) {
            return res.status(400).json({ msg: "לא נמצא קופון פעיל למשתמש זה" });
        }
        res.json({ msg: "המתנה נוצלה בהצלחה!", data: updatedMember });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "שגיאה במימוש המתנה", err });
    }
};