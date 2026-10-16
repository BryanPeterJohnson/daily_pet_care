import type { Role, SessionUser } from "./types";

export const ROLE_LABELS: Record<Role, string> = { ADMIN: "Admin", EDITOR: "Editor", AUTHOR: "Author" };

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  ADMIN: "Full access: content, users, and site settings.",
  EDITOR: "Manage and publish all posts, categories, media, subscribers and messages.",
  AUTHOR: "Write own posts and submit them for review. Cannot publish.",
};

const STAFF: Role[] = ["ADMIN", "EDITOR"];

export const can = {
  publish: (u: SessionUser) => STAFF.includes(u.role),
  editAnyPost: (u: SessionUser) => STAFF.includes(u.role),
  editPost: (u: SessionUser, authorId: number) => STAFF.includes(u.role) || u.id === authorId,
  manageCategories: (u: SessionUser) => STAFF.includes(u.role),
  manageSubscribers: (u: SessionUser) => STAFF.includes(u.role),
  manageMessages: (u: SessionUser) => STAFF.includes(u.role),
  manageUsers: (u: SessionUser) => u.role === "ADMIN",
  manageSettings: (u: SessionUser) => u.role === "ADMIN",
};

export const STAFF_ROLES = STAFF;
