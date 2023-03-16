export type ProjectType = {
  _id?: string;
  slug?: string;
  images?: SingleImageType[];
  title?: string;
  domainName?: string;
  tags?: string[];
  videoURL?: string;
  frontEndGithubURL?: string;
  backEndGithubURL?: string;
  mainContent?: string;
  url?: string;
  description?: string;
  isPublished?: boolean;
  isDraft?: boolean;
};

type ProjectLoadingOptionsType = string | null;

export type SingleImageType = {
  secure_url?: string;
  public_id?: string;
  url?: string;
  size?: string;
  name?: string;
};

export type InitialProjectStateType = {
  projects: ProjectType[];
  currentProject: ProjectType;
  projectLoading: ProjectLoadingOptionsType;
  currentlyUploadedImages: SingleImageType[];
  draftProject?: ProjectType;
};

export type ProjectProps = {
  _id: string;
  slug: string;
  images: SingleImageType[];
  domainName: string;
  title: string;
  tags: string[];
  videoURL: string;
  url: string;
  description: string;
  mainContent?: string;
};
