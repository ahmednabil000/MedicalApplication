const swaggerJsdoc = require("swagger-jsdoc");
const {
  SERVICES,
  RESERVATION_STATUS,
  ROLES,
} = require("../modules/shared/constants");

const definition = {
  openapi: "3.0.3",
  info: {
    title: "Medical Application API",
    version: "1.0.0",
    description:
      "REST API for the Medical Application. Handles user management, OAuth authentication, and medical reservation scheduling.",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: "http://localhost:{port}",
      description: "Local development server",
      variables: {
        port: {
          default: "3000",
          description: "Port configured via PORT environment variable",
        },
      },
    },
  ],
  tags: [
    { name: "Health", description: "Server liveness check" },
    {
      name: "Auth",
      description: "OAuth 2.0 authentication via Google and Facebook",
    },
    {
      name: "Users",
      description: "User retrieval and admin account management",
    },
    {
      name: "Reservations",
      description: "Medical reservation lifecycle management",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "JWT token obtained from an OAuth callback response. Pass as `Authorization: Bearer <token>`.",
      },
    },
    schemas: {
      // ── Enums ──────────────────────────────────────────────────────
      Role: {
        type: "string",
        enum: Object.values(ROLES),
        example: ROLES.ADMIN,
      },
      MedicalService: {
        type: "string",
        enum: SERVICES,
        example: SERVICES[0],
      },
      ReservationStatus: {
        type: "string",
        enum: Object.values(RESERVATION_STATUS),
        example: RESERVATION_STATUS.PENDING,
      },

      // ── Core models ────────────────────────────────────────────────
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          },
          name: { type: "string", example: "Ahmed Ali" },
          email: {
            type: "string",
            format: "email",
            example: "ahmed@example.com",
            nullable: true,
          },
          phone: { type: "string", example: "01012345678", nullable: true },
          role: { $ref: "#/components/schemas/Role" },
          googleId: { type: "string", nullable: true },
          facebookId: { type: "string", nullable: true },
        },
      },
      ReservationDetails: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          status: { $ref: "#/components/schemas/ReservationStatus" },
          reason: {
            type: "string",
            nullable: true,
            example: "Patient requested rescheduling",
          },
          assignedToId: { type: "string", format: "uuid", nullable: true },
          reservationId: { type: "string", format: "uuid" },
        },
      },
      Reservation: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "f1e2d3c4-b5a6-7890-abcd-ef1234567890",
          },
          patientName: { type: "string", example: "Mohamed Hassan" },
          age: { type: "integer", minimum: 1, example: 35 },
          egyptianMobileNumber: {
            type: "string",
            pattern: "^(010|011|012|015)[0-9]{8}$",
            example: "01023456789",
          },
          locationUrl: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://maps.google.com/?q=30.0444,31.2357",
          },
          reservationDate: {
            type: "string",
            format: "date-time",
            example: "2026-06-15T10:00:00.000Z",
          },
          service: { $ref: "#/components/schemas/MedicalService" },
          userId: { type: "string", format: "uuid" },
          details: {
            nullable: true,
            allOf: [{ $ref: "#/components/schemas/ReservationDetails" }],
          },
        },
      },

      // ── Request bodies ─────────────────────────────────────────────
      CreateUserBody: {
        type: "object",
        required: ["name", "phone", "password"],
        properties: {
          name: { type: "string", example: "Sara Khaled" },
          phone: { type: "string", example: "01198765432" },
          password: {
            type: "string",
            format: "password",
            minLength: 1,
            example: "SecureP@ss1",
          },
          role: { $ref: "#/components/schemas/Role" },
        },
      },
      CreateReservationBody: {
        type: "object",
        required: [
          "patientName",
          "age",
          "egyptianMobileNumber",
          "service",
          "userId",
          "reservationDate",
        ],
        properties: {
          patientName: { type: "string", example: "Omar Tarek" },
          age: { type: "integer", minimum: 1, example: 28 },
          egyptianMobileNumber: {
            type: "string",
            pattern: "^(010|011|012|015)[0-9]{8}$",
            example: "01012345678",
          },
          locationUrl: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://maps.google.com/?q=30.0444,31.2357",
          },
          service: { $ref: "#/components/schemas/MedicalService" },
          userId: {
            type: "string",
            format: "uuid",
            example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          },
          reservationDate: {
            type: "string",
            format: "date-time",
            example: "2026-06-20T09:30:00.000Z",
          },
          assignedToId: {
            type: "string",
            format: "uuid",
            nullable: true,
            example: "b2c3d4e5-f6a7-8901-bcde-f01234567891",
          },
          status: { $ref: "#/components/schemas/ReservationStatus" },
          reason: {
            type: "string",
            nullable: true,
            example: "Follow-up visit",
          },
        },
      },

      // ── Pagination ─────────────────────────────────────────────────
      PaginationMeta: {
        type: "object",
        properties: {
          total: { type: "integer", example: 42 },
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 5 },
        },
      },
      PaginatedReservations: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/Reservation" },
          },
          meta: { $ref: "#/components/schemas/PaginationMeta" },
        },
      },

      // ── Auth responses ─────────────────────────────────────────────
      AuthSuccessResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Google login successful" },
          token: {
            type: "string",
            description:
              "JWT token valid for 7 days. Use as Bearer token in the Authorization header.",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
          user: { $ref: "#/components/schemas/User" },
        },
      },

      // ── Common errors ──────────────────────────────────────────────
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string", example: "Internal Server Error" },
        },
      },
      ValidationErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string", example: '"patientName" is required' },
        },
      },
      UnauthorizedResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Authentication required" },
        },
      },
      ForbiddenResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Access forbidden: insufficient permissions",
          },
        },
      },
    },
  },
};

const options = {
  definition,
  // Glob paths where @openapi JSDoc blocks live
  apis: [
    "./index.js",
    "./modules/auth/auth-routes.js",
    "./modules/users/users-routes.js",
    "./modules/reservations/reservations-routes.js",
  ],
};

module.exports = swaggerJsdoc(options);
