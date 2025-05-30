export interface RepoType {
  id: number;
  name: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  stargazers_count?: number;
  forks_count?: number;
  language?: string;
  description?: string;
  forks?: number;
  created_at?: string;
  languages_url?: string;
  watchers?: number;
  open_issues_count?: number;
}
