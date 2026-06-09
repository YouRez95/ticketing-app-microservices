import { Document, Model, model, Schema } from "mongoose";
import { Password } from "../services/password";

// What we receive
interface UserAttrs {
  email: string;
  password: string;
}

// Model + custom methods
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// What Mongo returns
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed); // or this.password = hashed;
  }
});

const User = model<UserDoc, UserModel>("User", userSchema);

export default User;
