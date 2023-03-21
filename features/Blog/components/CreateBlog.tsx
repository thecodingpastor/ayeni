import classes from "./CreateBlog.module.scss";
import CreateBlogForm from "./CreateBlogForm";

const CreateBlog = () => {
  return (
    <div className={classes.Container}>
      <h1 className="text-center">Create Blog</h1>
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
