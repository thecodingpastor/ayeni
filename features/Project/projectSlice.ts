import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialProjectStateType, ProjectType } from "./type";
import ProjectExtraReducers from "./projectExtraReducers";
import { RootState } from "../../fetchConfig/store";

const prevProject =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("draft_project"))) ||
  null;

const initialState: InitialProjectStateType = {
  projects: [],
  projectLoading: null,
  currentProject: null,
  currentlyUploadedImages: [],
  draftProject: {
    title: prevProject?.title || "",
    backEndGithubURL: prevProject?.backEndGithubURL || "",
    description: prevProject?.description || "",
    domainName: prevProject?.domainName || "",
    frontEndGithubURL: prevProject?.frontEndGithubURL || "",
    mainContent: prevProject?.mainContent || "",
    images: prevProject?.images || [],
    tags: prevProject?.tags || [],
    videoURL: prevProject?.videoURL || "",
  },
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    ClearAllProjects: (state) => {
      state.projects = [];
    },
    // Not in use yet
    ResetProjectState: (state) => {
      state.projects = [];
      state.projectLoading = null;
      state.currentlyUploadedImages = [];
    },
    SetDraftProject: (state, action: PayloadAction<ProjectType>) => {
      state.draftProject = action.payload;
    },
    GetCurrentProject: (state, action: PayloadAction<string>) => {
      if (state.projects.length > 0) {
        state.currentProject =
          state.projects.find(
            (p) => p.slug === action.payload || p._id === action.payload
          ) || null;
      }
    },
    SetCurrentProject: (state, action: PayloadAction<ProjectType | null>) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: ProjectExtraReducers,
});

export const {
  ClearAllProjects,
  GetCurrentProject,
  SetCurrentProject,
  SetDraftProject,
} = projectSlice.actions;

export const SelectProject = (state: RootState) => state.project;
export default projectSlice.reducer;
