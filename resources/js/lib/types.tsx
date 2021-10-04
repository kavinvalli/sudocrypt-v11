import { Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  email_verified_at?: string;
  level: number;
  admin: boolean | number;
  points: number;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    circle: {
      name: string;
      id: number;
      onlyOneLevel: boolean;
    };
    dates: {
      start: string;
      end: string;
    };
    errors: any;
    started: boolean;
    ended: boolean;
    authenticated: boolean;
    auth: {
      user: IUser;
    };
  };
}
