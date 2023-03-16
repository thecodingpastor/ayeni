import crypto from "crypto";
import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { UserInterface } from "../general-types";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [5, "Username cannot be less than 5 characters."],
      trim: () => true, // DOnt know why I had to do this
      unique: [
        true,
        "The username already exists, try another one or login if it's yours.",
      ],
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (this: UserInterface, next) {
  // ensures password was modified before it runs
  if (!this.isModified("password")) return next();
  // hashes the password
  this.password = await bcrypt.hash(this.password!, 12);
  next();
});

UserSchema.pre("save", function (this: UserInterface, next) {
  // Sets password changed at field in the user collection
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance Method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Pending Password changed after
// UserSchema.methods.changedPasswordAfter = function (JWTTimestamp: Date) {
//   if (this.passwordChangedAt) {
//     // the getTime() Method changes date from y:m:d to seconds, then divided by 1000 to change to milliseconds
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     ); //The optional 10 is to specify the base of conversion (base 10)
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// models.User prevents unnecessary re-instatiation of User model
// const User = model<UserInterface>("User", UserSchema);
const User = models.User || (model("User", UserSchema) as any); //any is incorrect, manage for now
export default User;
