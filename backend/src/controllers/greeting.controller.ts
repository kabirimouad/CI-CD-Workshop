import { Request, Response } from "express";
import { greetingService } from "../services/greeting.service";
import { handleApiSuccess } from "../utils/apiHelpers";

export async function greetingController(req: Request, res: Response) {
    try {
        const greeting = await greetingService();
        handleApiSuccess(res, 200, greeting);
    } catch (e: any) {
        console.error(e);
    }
}
