import {NativeQuestion} from "@/app/_types/question";

export type Survey = {
    id: string,
    questions: NativeQuestion[],
    created_at: Date
}