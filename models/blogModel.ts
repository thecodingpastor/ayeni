import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [5, "Blog Title cannot be less than 5 characters."],
      maxlength: [100, "Blog Title cannot be more than 300 characters."],
    },
    images: Array,
    slug: {
      type: String,
      unique: [true, "Tweak the title a bit, title already in use"],
    },
    tags: Array,
    isPublished: {
      type: Boolean,
      default: false,
    },
    intro: {
      type: String,
      minlength: [10, "Blog intro cannot be less than 10 characters"],
      maxlength: [200, "Blog intro cannot be more than 200 characters."],
    },
    mainContent: {
      type: String,
      minlength: [10, "Blog content cannot be less than 10 characters"],
    },
    estimatedReadTime: Number,
  },
  { timestamps: true }
);

// const Blog = model<BlogInterface>("Blog", BlogSchema);
const Blog = models.Blog || (model("Blog", BlogSchema) as any); //any is incorrect,

export default Blog;
