import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }: { onPromptClick: (prompt: string) => void }) => {
  const prompts = [
    "What is the meaning of life?",
    "Tell me a joke.",
    "Who is lewis hamilton?",
    "What is the weather like today?",
    "Can you recommend a book?",
  ];
  return (
    <div className="prompt-suggestion-row">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton
          key={index}
          text={prompt}
          onClick={() => onPromptClick(prompt)}
        />
      ))}
    </div>
  );
};

export default PromptSuggestionRow;
