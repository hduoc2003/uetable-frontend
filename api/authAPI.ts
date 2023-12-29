import { OkResponse } from "@/types/response";
import Fetcher from "./Fetcher";
import { delay } from "@/utils/delay";

export class AuthAPI {
    static async activateAccount(token: string): Promise<OkResponse> {
        try {
            // const res: OkResponse = await Fetcher.get(`/users/activate/${token}`);
            await delay(200);
            // return res;
            return {
                ok: true
            }
        } catch (error) {
            console.log(error);
            return {
                ok: false
            }
        }
    }
}
