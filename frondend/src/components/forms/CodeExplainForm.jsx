import { useActionState, useState } from "react";
import { explain } from "../../actions";
import CodeExplanation from "../CodeExplanation";
import Error from "../Error";

const CodeExplainForm = () => {
    const [inputValue, setInputValue] = useState("");
    
    const [formState, formAction, isPending] = useActionState(explain, null);
    console.log("input:", inputValue)
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg text-black" >
        <form action={formAction}>

            <label htmlFor="" className="block mb-2 font-semibold" >Language</label>

            <select name="language" 
            className="border rounded-lg p-2 2-full mb-4 bg-transparent">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
            </select>

            <label htmlFor="" className="block mb-2 font-semibold" >Your Code:</label>

            <textarea name="code"
            required 
            placeholder="Paste your code here..."
            className="border rounded-lg w-full p-3 font-mono text-sm bg-transparent min-h-[150px]" 
            onChange={(e)=> {
                setInputValue(e.target.value)
            }}
            value={inputValue} />

            <button 
            type="submit"
            disabled={isPending}
            className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white 
            font-semibold hover:bg-blue-700 transition disabled:opacity-50" >
                { isPending? "Explaining..." : "Explain Code"}
            </button>

        </form>

        {/* {
            console.log(`fromData: ${formState?.data?.explanation}
            error: ${formState?.error}`)
        } */}

        { 
            isPending ? (
                <p className="bg-gray-300 my-3 w-64 p-2 rounded-sm">
                    Thinking...</p>
            ) : formState?.success ? (
                <CodeExplanation explanation={formState?.data?.explanation} />
            ) : (
                formState?.success === false && (
                    <Error error={formState?.error} />
                )
            )
        }

    </div>
  )
}

export default CodeExplainForm