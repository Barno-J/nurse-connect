import jwt from "jsonwebtoken";
import { ValidationException, BadRequestException, ForbiddenException, UnauthorizedException } from "../exceptions/index.js";
import { verifyToken } from "../utils/jwt.js";
import prisma from "../config/db.js";
import logger from "../utils/logger.js";


export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Authorization token missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Fetch user with staff and role data
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        staff: {
          include: {
            role: true, // This ensures staff.role.name is available
          },
        },
        customer: true, // optional if you want customer info as well
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    req.user = user; // Attach full user object with role to request
    next();
  } catch (err) {
    next(err);
  }
};

export const authorizeStaff = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthorizedException("User not authenticated");
    }

    if (!Array.isArray(roles)) {
      throw new BadRequestException("Roles must be an array of strings");
    }

    // If not a staff user
    if (!req.user.staff) {
      throw new ForbiddenException("User is not a staff member");
    }
   logger.info(req.user.staff.role.name, "User role name");
    // Check if role name matches
    if (!roles.includes(req.user.staff.role.name)) {
      throw new ForbiddenException(
        `User does not have the required roles: ${roles.join(", ")}`
      );
    }

    next();
  };
};
