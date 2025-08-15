import prisma from "../Config/db.js";
import { UnauthorizedException, BadRequestException, ForbiddenException } from "../exceptions/index.js";
import userSchema from "../schemas/user.js";
import loginSchema from "../schemas/login.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";


export const loginUser = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const { error, value } = loginSchema.validate({ email, password });
	if (error) throw new BadRequestException(error.details[0].message);
	const user = await prisma.user.findUnique({ where: { email: value.email } });
	if (!user) throw new UnauthorizedException("Invalid email");
	const isPasswordValid = await bcrypt.compare(value.password, user.password);
	if (!isPasswordValid) throw new UnauthorizedException("Invalid password");
	const token = generateToken({ id: user.id, email: user.email, role: user.role });
	res.status(200).json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});


export const createUser = catchAsync(async (req, res) => {
	const { error, value } = userSchema.validate(req.body);
	if (error) throw new BadRequestException(error.details[0].message);

	const existingUser = await prisma.user.findUnique({ where: { email: value.email } });
	if (existingUser) throw new BadRequestException("Email already exists");

	const hashedPassword = await bcrypt.hash(value.password, 10);

	const baseUserData = {
		fullName: value.fullName,
		email: value.email,
		password: hashedPassword,
		nationalId: value.nationalId,
		role: value.role,
		phone: value.phone || null,
		address: value.address || null,
	};

	let newUser;

	if (value.role === "ADMIN") {
		newUser = await prisma.user.create({
			data: {
				...baseUserData,
				userAdmin: {
					create: {
						permissions: {
							assign_roles: true,
							manage_users: true,
							view_reports: true,
							delete_records: true,
							manage_content: true,
							manage_courses: true,
							manage_mentors: true,
							manage_payments: true,
							manage_enrollments: true,
							manage_community_groups: true,
							moderate_community_posts: true,
						},
					},
				},
			},
			include: { userAdmin: true },
		});
	} else {
		newUser = await prisma.user.create({
			data: {
				...baseUserData,
				userNurse: {
					create: {
						specialization: value.specialization || "",
						yearOfExperience: value.yearOfExperience || 0,
						sex: value.sex || "",
						age: value.age || 0,
						location: value.location || "",
					},
				},
			},
			include: { userNurse: true },
		});
	}

	const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

	res.status(201).json({
		message: "User created successfully",
		token,
		user: {
			id: newUser.id,
			name: newUser.fullName,
			email: newUser.email,
			role: newUser.role,
			...(newUser.userNurse ? { nurse: newUser.userNurse } : {}),
			...(newUser.userAdmin ? { admin: newUser.userAdmin } : {}),
		},
	});
});
