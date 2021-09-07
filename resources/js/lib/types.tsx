import { Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  email_verified_at?: string;
  level?: number;
  circle?: number;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: any;
    started: string;
    ended: string;
    authenticated: boolean;
    auth: {
      user: IUser;
    };
  };
}
