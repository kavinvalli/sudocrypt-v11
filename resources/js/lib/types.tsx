import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  email_verified_at?: string;
  admin: boolean | number;
  points: number;
  institution: string;
  disqualified: boolean | number;
  last_solved: string;
  level_id?: number;
  circle_id: number;

  discord_id?: string;
  discord_username?: string;
  discord_discriminator?: string;
  discord_email?: string;

  level?: ILevel;
  circle?: ICircle;
}

export interface ILevel {
  id: number;
  created_at: string;
  updated_at: string;
  circle_id: string;
  question: string;
  source_hint?: string;
  answer?: string;
  points: number;

  circle?: ICircle;
}

export interface ICircle {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;

  levels?: ILevel[];
}

export interface IUserAttempt {
  id: number;
  created_at: string;
  updated_at: string;
  level_id: number;
  circle_id: number;
  user_id: number;
  attempt: string;
  ip: string;
  correct: boolean;

  level?: ILevel;
  circle?: ICircle;
  user?: IUser;
}

export interface IShortlink {
  id: number;
  created_at: string;
  updated_at: string;
  shortlink: string;
  url: string;
}

export interface INotification {
  id: number;
  created_at: string;
  updated_at: string;
  content: string;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    circle: ICircle;
    errors: Errors & ErrorBag;
    dates: {
      start: string;
      end: string;
    };
    started: boolean;
    ended: boolean;
    authenticated: boolean;
    auth: {
      user: IUser;
    };
  };
}
