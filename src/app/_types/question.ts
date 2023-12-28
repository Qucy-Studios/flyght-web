
export type Question = {
    question: string,
    kind: string,
    choices: Choice[],
    errors: string[]
}

export type Choice = {
    key: string,
    text: string,
    emoji: string | null,
    description: string | null
}

export type QuestionKinds = "Single-choice" | "Multi-choice" | "Prompt" | "Yes or No" | "Text Block"
export const availableQuestionKinds = ["Single-choice", "Multi-choice", "Prompt", "Yes or No", "Text Block"]

// Native Question are those native to the server, and not to this client.
export type NativeQuestion = {
    key: string,
    question: string,
    kind: string,
    choices: Choice[],
}

function dec2hex(dec: number) {
    return dec.toString(16).padStart(2, "0")
}

function generateId(len: number) {
    let arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}
export const createRandomKey = (): string => generateId(32)
export const NativeKindMappings = new Map<string, string>(
    [
        ["Prompt", "PROMPT"],
        ["Multi-choice", "MULTIPLE_CHOICE"],
        ["Single-choice", "SINGLE_CHOICE"],
        ["Yes or No", "YES_OR_NO"],
        ["Text Block", "TEXT_BLOCK"]
    ]
)
export function isNonDecorative(kind: string) {
    return kind !== 'Text Block'
}
export function clientToNativeKind(kind: string): string {
    return NativeKindMappings.get(kind)!!
}

function nativeToClientKind(kind: string): string {
    return Array.from(NativeKindMappings.entries()).find((entry) => entry[1] === kind)!![0]
}

export function nativeToClient(questions: NativeQuestion[]): Question[] {
    return questions.map((question) => {
       return {
           kind: nativeToClientKind(question.kind),
           choices: question.choices.map((choice) => {
               return { ...choice, key: createRandomKey() } satisfies Choice
           }),
           question: question.question,
           errors: []
       } satisfies Question
    })
}