"use client";

import {useSearchParams} from "next/navigation";
import SurveyPrompt from "@/components/survey/SurveyPrompt";
import {useEffect, useState} from "react";
import {
    availableQuestionKinds,
    clientToNativeKind,
    createRandomKey,
    isNonDecorative,
    NativeQuestion,
    nativeToClient,
    Question, QuestionKinds
} from "@/types/question";
import SurveyQuestion from "@/components/survey/SurveyQuestion";
import {Token} from "@/types/token";
import {Survey} from "@/types/survey";
import SurveyToolbar from "@/components/survey/SurveyToolbar";
import SurveyAlert from "@/components/survey/SurveyAlert";
import InvalidLink from "@/components/survey/errors/InvalidLink";
import ErrorMessage from "@/components/survey/errors/ErrorMessage";
import SurveySaved from "@/components/survey/success/SurveySaved";
import Loading from "@/components/survey/pending/Loading";
import {fetchExchangeToken} from "@/requests/fetch_tokens";
import {fetchSurvey} from "@/requests/fetch_survey";
import {MAXIMUM_QUESTIONS, MAXIMUM_TEXT_BLOCKS} from "@/constants/maximums";
import {updateSurvey} from "@/requests/update_survey";
import MaximumTextBlockDialog from "@/components/dialogs/MaximumTextBlockDialog";
import MaximumQuestionsDialog from "@/components/dialogs/MaximumQuestionsDialog";
import ContinueSaveDialog from "@/components/dialogs/ContinueSaveDialog";

export default function SurveyEditor() {

    const searchParams = useSearchParams()
    const accessToken = searchParams.get('access_token')

    // Flyght Origin (used by setup command)
    const origin = searchParams.get('origin')

    if (accessToken == null) return (<InvalidLink/>)

    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState(null as string | null)

    const [exchangeToken, setExchangeToken] = useState('')

    const [existingSurvey, setExistingSurvey] = useState(null as Survey | null)
    const [questions, setQuestions] = useState([] as Question[])

    const [isSaving, setIsSaving] = useState(false)
    const [isSaved, setSaved] = useState(false)
    const [errors, setErrors] = useState([] as string[])

    const [showMaximumTextBlocksWarning, setShowMaximumTextBlocksWarning] = useState(false)
    const [showMaximumQuestionsWarning, setShowMaximumQuestionsWarning] = useState(false)

    const [showSaveDialog, setShowSaveDialog] = useState(false)

    const catchFetchError = (error: any) => {
        let message = 'Unknown error.'
        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        }
        setLoadError(message)
    }

    const handleBadResponse = async (response: Response) => {
        try {
            const { code, error } = await response.json() as { code: number, error: string }
            if (code === 1) {
                return
            }
            setLoadError(error)
        } catch (err) {
            setLoadError(`We couldn't load the survey editor. Our machines returned an unknown error with status ${response.statusText} (code ${response.statusText}).`)
        } finally {
            setIsLoading(false)
        }
        return
    }

    const loaded = () => setIsLoading(false)

    useEffect(() => {
        if (accessToken && !exchangeToken) {
            console.info('Requesting exchange token.')
            fetchExchangeToken(accessToken)
                .then(async (response) => {
                    if (!response.ok) {
                        return await handleBadResponse(response)
                    }

                    const token = (await response.json()) as Token
                    setExchangeToken(token.key)
                })
                .catch(catchFetchError)
        }

        if (exchangeToken) {
            console.info('Requesting current survey version.')
            fetchSurvey(exchangeToken)
                .then(async (response) => {
                    if (!response.ok) {
                        return handleBadResponse(response)
                    }

                    const survey = (await response.json()) as Survey
                    setExistingSurvey(survey)

                    if (survey.questions != null) {
                        setQuestions(nativeToClient(survey.questions) as Question[])
                    }
                })
                .then(loaded)
                .catch(catchFetchError)
        }
    }, [accessToken, exchangeToken]);

    if (isLoading) {
        return (<Loading/>)
    }

    if (loadError != null) {
        return (<ErrorMessage error={loadError}/>)
    }

    if (existingSurvey == null || questions == null) {
        return (<InvalidLink/>)
    }

    if (isSaved) {
        return <SurveySaved/>
    }

    function calculateSizes() {
        let [textBlocks, nonDecoratives] = [0, 0]
        for (let question of questions) {
            if (question.kind === 'Text Block') {
                textBlocks++
                continue
            }

            nonDecoratives++
        }
        return { textBlocks, nonDecoratives }
    }

    function addQuestion(kind: QuestionKinds) {
        const { textBlocks, nonDecoratives } =  calculateSizes()
        if (kind === 'Text Block' && textBlocks >= MAXIMUM_TEXT_BLOCKS) {
            return setShowMaximumTextBlocksWarning(true)
        }
        if (isNonDecorative(kind) && nonDecoratives >= MAXIMUM_QUESTIONS) {
            return setShowMaximumQuestionsWarning(true)
        }

        setQuestions([...questions, {choices: [], question: '', kind: kind, errors: []}])
        setTimeout(() => window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        }), 100)
    }

    function removeIndex(index: number) {
        setQuestions(questions.filter((_, ind) => index !== ind))
    }

    function move(up: boolean, index: number) {
        if (up && index === 0) return
        if (!up && index === (questions.length - 1)) return
        setQuestions(prevState => {
            let copy = [...prevState];
            let a = copy[index];
            copy[index] = copy[index + (up ? -1 : 1)]
            copy[index + (up ? -1 : 1)] = a
            return copy
        })
    }

    async function promptSave() {
        const isInvalid = validate()
        if (isInvalid) {
            return
        }

        setShowSaveDialog(true)
    }

    function validate(): boolean {
        let hasErrors = false
        let copy = [] as Question[]

        if (questions.length < 1) {
            setErrors(["You cannot save an empty survey. Please add at least one question."])
            return true
        }

        for (let question of questions) {
            if (question.errors.length > 0) {
                question.errors = []
            }
            if (question.choices.length == 0 && !(question.kind === 'Prompt' || question.kind === 'Yes or No' || question.kind === 'Text Block')) {
                question.errors = [...question.errors, 'You need to have at least 1 choice in choice-based question.']
                hasErrors = true
            }
            if (question.choices.length > 10) {
                question.errors = [...question.errors, 'You cannot add more than 10 choices.']
                hasErrors = true
            }
            for (let choice of question.choices) {
                if (choice.text.length > 100) {
                    question.errors = [...question.errors, 'A choice cannot be more than 100 characters.']
                    hasErrors = true
                }

                if (choice.text.length === 0) {
                    question.errors = [...question.errors, 'A choice cannot be empty.']
                    hasErrors = true
                }

                if (choice.description != null && choice.description.length > 50) {
                    question.errors = [...question.errors, 'A choice\'s description cannot be more than 100 characters.']
                    hasErrors = true
                }
            }
            if (question.question.length > 1024) {
                question.errors = [...question.errors, 'You can only write up to 1,024 characters for the question.']
                hasErrors = true
            }
            if (!availableQuestionKinds.includes(question.kind)) {
                question.errors = [...question.errors, `Unknown question kind. [kind=${question.kind}]`]
                hasErrors = true
            }
            copy = [...copy, question]
        }
        setQuestions(copy)
        return hasErrors
    }

    async function save() {
        if (isSaving) {
            return
        }

        setIsSaving(true)
        const hasErrors = validate()

        if (!hasErrors) {
            let native = [] as NativeQuestion[]
            const generateKey = (): string => {
                let key = createRandomKey()
                for (let nativeQuestion of native) {
                    if (nativeQuestion.key !== '' && nativeQuestion.key === key) {
                        return generateKey()
                    }
                }
                return key
            }
            for (let question of questions) {
                native = [...native, {
                    key: generateKey(),
                    kind: clientToNativeKind(question.kind),
                    choices: question.choices,
                    question: question.question
                }]
            }

            try {
                const response = await updateSurvey(exchangeToken, origin, native)
                if (!response.ok) {
                    try {
                        const {  error } = await response.json() as { code: number, error: string }
                        setErrors([error])
                    } catch (err) {
                        setErrors([
                            `We couldn't save the survey. Our machines returned an unknown error with status ${response.statusText} (code ${response.statusText}).`
                        ])
                    }
                    setIsSaving(false)
                    return
                }
                setSaved(true)
            } catch (err) {
                setErrors([`Failed to save survey: ${err}`])
            }
        }

        setIsSaving(false)
        setShowSaveDialog(false)
    }

    return (
        <div className={"flex flex-col lg:flex-row gap-2 lg:gap-4 py-6 lg:px-24 align-middle justify-center"}>
            <div className={"lg:sticky top-0 z-50 h-full"}>
                <div className={"flex flex-col gap-2"}>
                    <SurveyPrompt/>
                    <SurveyToolbar save={promptSave} addQuestion={addQuestion}/>
                    <div>
                        {errors.length > 0 ? (
                            <SurveyAlert title={"An error occurred while saving."}>
                                <div className={"font-light text-sm max-w-sm flex flex-col gap-2"}>
                                    {errors.map((error) => {
                                        return (
                                            <p className={"text-red-400"}>• {error}</p>
                                        )
                                    })}
                                </div>
                            </SurveyAlert>
                        ) : null}
                        <ContinueSaveDialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)} onSave={save} saving={isSaving}/>
                        <MaximumQuestionsDialog open={showMaximumQuestionsWarning} onClose={() => setShowMaximumQuestionsWarning(false)}/>
                        <MaximumTextBlockDialog open={showMaximumTextBlocksWarning} onClose={() => setShowMaximumTextBlocksWarning(false)}/>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                {questions.map((question, index) => {
                    return (
                        <SurveyQuestion
                            key={question.kind+"-"+index}
                            position={index}
                            question={question}
                            onEdit={(copy) => setQuestions(prevState => {
                                let cpy = [...prevState]
                                cpy[index] = copy
                                return cpy
                            })}
                            onMove={(kind: 'up' | 'down') => move(kind === 'up', index)}
                            onDelete={() => removeIndex(index)}
                        />
                    )
                })}
            </div>
        </div>
    )
}