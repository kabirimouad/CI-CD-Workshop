import { type Response } from "express";
import { ZodError } from "zod";

export const handleApiError = (res: Response, error: unknown) => {
    if (error instanceof ZodError)
        return res.status(400).json({
            success: false,
            error: error.errors.map((e) => e.message).join(" - "),
        });
    else if (error instanceof API_ERROR)
        return res.status(error.statusCode).json({
            success: false,
            error: error.message,
        });

    return res.status(500).json({
        success: false,
        error: "Oops, An error has occurred... Please try again later.",
    });
};

export const handleApiSuccess = (
    res: Response,
    statusCode: number,
    data: object = {},
) =>
    res.status(statusCode).json({
        success: true,
        ...data,
    });

export class API_ERROR extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class INTERNAL_SERVER_ERROR extends API_ERROR {
    constructor() {
        super("Oops, An error has occurred... Please try again later.", 500);
    }
}

export class USER_NOT_LOGGED_IN extends API_ERROR {
    constructor() {
        super("User not logged in.", 401);
    }
}

export class UNAUTHORIZED_ERROR extends API_ERROR {
    constructor() {
        super("You are not authorized to perform the following action.", 403);
    }
}

export class TOKEN_EXPIRED_ERROR extends API_ERROR {
    constructor() {
        super("Token expired.", 403);
    }
}

export class DUPLICATE_ENTITY_ERROR extends API_ERROR {
    // @BR4INL3SS
    // I don't know whether to leave this open or to put "account" | "user" ...
    constructor(entity: string) {
        super(`This ${entity} already exists`, 409);
    }
}

export class INVALID_PASSWORD_ERROR extends API_ERROR {
    constructor() {
        super("Invalid Password", 422);
    }
}

export class TOO_MANY_REQUESTS_ERROR extends API_ERROR {
    constructor() {
        super("Too many requests, please try again later...", 429);
    }
}

export class USER_NOT_FOUND_ERROR extends API_ERROR {
    constructor() {
        super("User not found.", 404);
    }
}

export class USER_NOT_CONFIRMED_ERROR extends API_ERROR {
    constructor() {
        super("User not confirmed.", 403);
    }
}

export class FORBIDDEN_ERROR extends API_ERROR {
    constructor() {
        super("Forbidden.", 403);
    }
}

export class COMMENT_NOT_FOUND_ERROR extends API_ERROR {
    constructor() {
        super("Comment not found.", 404);
    }
}

export class REVIEW_NOT_FOUND_ERROR extends API_ERROR {
    constructor() {
        super("Review not found.", 404);
    }
}
