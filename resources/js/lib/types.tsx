import { Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  email_verified_at?: string;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: any;
    authenticated: boolean;
    user: IUser;
  }
}
