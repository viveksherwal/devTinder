const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");

// 🟢 GET profile (for logged-in user)
profileRouter.get("/profile", userauth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// ✏️ PATCH profile (edit allowed fields only)
profileRouter.patch("/profile/edit", userauth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;

    // Update only allowed fields
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your profile has been updated successfully!`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// 🔐 PATCH password (change password securely)
profileRouter.patch("/profile/password", userauth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input presence
    if (!currentPassword || !newPassword) {
      throw new Error("Both current and new passwords are required");
    }

    const loggedInUser = req.user;

    // Compare old password with hashed one
    const isMatch = await bcrypt.compare(currentPassword, loggedInUser.password);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    // Check password strength
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "Please enter a strong password (min 8 chars, include uppercase, lowercase, number & symbol)"
      );
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;

    await loggedInUser.save();

    res.send("Password updated successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
