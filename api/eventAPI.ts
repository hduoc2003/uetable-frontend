import { EventInfo } from "@/types/event";
import Fetcher from "./Fetcher";
import { OkResponse } from "@/types/response";

interface EventResponse {
    id: string;
    name: string;
    timeStart: string; // date format
    timeEnd: string; // date format
    color: string;
    location: string;
    info: string;
}

export class EventAPI {
    static async getEventsInWeek(): Promise<EventInfo[]> {
        try {
            const response = await Fetcher.get<any, EventResponse[]>('/schedule/getScheduleInWeek');
            // console.log(response)
            let data: EventInfo[] = response.map((event): EventInfo  => ({
                justCreated: false,
                id: event.id,
                name: event.name,
                timeStart: new Date(event.timeStart),
                timeEnd: new Date(event.timeEnd),
                color: event.color,
                location: event.location,
                info: event.info
            }))
            return data;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async createEvent(eventInfo: EventInfo): Promise<OkResponse> {
        try {
            await Fetcher.post<any, any, EventInfo>(`/event/createEvent`, eventInfo)
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false
            }
        }
    }

    static async deleteEvent(eventId: string): Promise<OkResponse> {
        try {
            await Fetcher.delete(`/event/deleteEventById/${eventId}`);
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

    static async updateEvent(eventInfo: EventInfo): Promise<OkResponse> {
        try {
            await Fetcher.put<any, any, EventInfo>(`/event/updateEventById/${eventInfo.id}`, eventInfo)
            return {
                ok: true
            }
        } catch (error) {
            return {
                ok: false
            }
        }
    }
}
