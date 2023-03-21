import Transition from "../../components/general/Transition";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import CreateBlog from "../../features/Blog/components/CreateBlog";

const index = () => {
  return (
    <ProtectedRoute>
      <Transition mode="scale-out">
        <CreateBlog />
      </Transition>
    </ProtectedRoute>
  );
};

export default index;
