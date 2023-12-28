import {NativeQuestion} from "@/types/question";

export type Survey = {
    id: string,
    questions: NativeQuestion[],
    created_at: Date
}