import ProtectedRoute from "../../components/layout/ProtectedRoute";
import PageLoader from "../../components/loaders/PageLoader";
import ProjectForm from "../../features/Project/components/ProjectForm";
import { SelectProject } from "../../features/Project/projectSlice";
import { useAppSelector } from "../../fetchConfig/store";

const index = () => {
  const { draftProject } = useAppSelector(SelectProject);

  // if (draftProject === undefined)
  //   return (
  //     <PageLoader
  //       IsVisible={draftProject === undefined}
  //       Loading={draftProject === undefined}
  //     />
  //   );

  return (
    <ProtectedRoute>
      <ProjectForm isEdit={!!draftProject?._id || false} />
    </ProtectedRoute>
  );
};

export default index;
