import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import {
  CreateProject,
  GetAllProjects,
  DeleteProject,
  UpdateProject,
  PublishAndUnpublishProject,
  GetSingleProjectFromBackend,
  DeleteImageFromCloud,
} from "./projectApi";
import { InitialProjectStateType } from "./type";

const ProjectExtraReducers = (
  builder: ActionReducerMapBuilder<InitialProjectStateType>
) => {
  // ============= GetAllProjects ======================
  builder.addCase(GetAllProjects.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(GetAllProjects.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(GetAllProjects.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects = action.payload;
  });
  // ============= GetSingleProjectFromBackend ======================
  builder.addCase(GetSingleProjectFromBackend.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(GetSingleProjectFromBackend.rejected, (state) => {
    state.projectLoading = null;
    state.currentProject = null;
  });
  builder.addCase(GetSingleProjectFromBackend.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.currentProject = action.payload;
  });
  // ============= CreateProject ======================
  builder.addCase(CreateProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(CreateProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(CreateProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects.unshift(action.payload);
  });
  // ============= UpdateProject ======================
  builder.addCase(UpdateProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(UpdateProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(UpdateProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects = state.projects
      ? state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        )
      : [];
  });
  // ============= DeleteProject ======================
  builder.addCase(DeleteProject.pending, (state, action) => {
    state.projectLoading = action.meta.arg;
  });
  builder.addCase(DeleteProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(DeleteProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects = state.projects.filter((p) => action.meta.arg !== p.slug);
  });
  // ============= DeleteImageFromCloud ======================
  builder.addCase(DeleteImageFromCloud.pending, (state, action) => {
    state.projectLoading = "delete-image-from-cloud";
  });
  builder.addCase(DeleteImageFromCloud.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(DeleteImageFromCloud.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects =
      state.projects.length > 0
        ? state.projects.map((project) =>
            project.slug === action.meta.arg.projectSlug
              ? { ...action.payload }
              : project
          )
        : [];
    state.currentProject = action.payload;
  });
  // ============= PublishAndUnpublishProject ======================
  builder.addCase(PublishAndUnpublishProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(PublishAndUnpublishProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(
    PublishAndUnpublishProject.fulfilled,
    (state, action: PayloadAction<{ _id: string; isPublished: boolean }>) => {
      state.projectLoading = null;
      state.currentProject = {
        ...state.currentProject,
        isPublished: action.payload.isPublished,
      };
    }
  );
};

export default ProjectExtraReducers;
