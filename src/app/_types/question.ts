
export type Question = {
    question: string,
    kind: string,
    choices: Choice[],
    errors: string[]
}

export type Choice = {
    text: string,
    emoji: string | null,
    description: string | null
}

// Native Question are those native to the server, and not to this client.
export type NativeQuestion = {
    key: string,
    question: string,
    kind: string,
    choices: Choice[],
}

export const createRandomKey = (): string => (Math.random() + 1).toString(36).substring(32)
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
           choices: question.choices,
           question: question.question,
           errors: []
       } satisfies Question
    })
}