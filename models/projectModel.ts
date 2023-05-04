import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    domainName: {
      type: String,
      minlength: [5, "Project domain name cannot be less than 5 characters."],
      maxlength: [
        300,
        "Project domain name cannot be more than 300 characters.",
      ],
    },
    images: Array,
    videoURL: String,
    slug: {
      type: String,
      unique: [true, "Tweak the title a bit, title already in use"],
    },
    backEndGithubURL: String,
    frontEndGithubURL: String,
    title: {
      type: String,
      minlength: [5, "Project title cannot be less than 5 characters."],
      maxlength: [50, "Project title cannot be more than 50 characters."],
    },
    tags: Array,
    isPublished: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      minlength: [20, "Project content cannot be less than 10 characters"],
      maxlength: [300, "Project content cannot be more than 300 characters."],
    },
    mainContent: {
      type: String,
      minlength: [40, "Project content cannot be less than 40 characters"],
    },
  },
  { timestamps: true }
);

// const Project = model<ProjectInterface>("Project", ProjectSchema);
const Project = models.Project || (model("Project", ProjectSchema) as any); //any is incorrect,
export default Project;
