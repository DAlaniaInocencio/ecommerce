import { SetMetadata } from "@nestjs/common";
import { Role } from "src/users/Roles/roles.enum";

export const ROLES = (...roles: Role[]) => SetMetadata('roles', roles);




