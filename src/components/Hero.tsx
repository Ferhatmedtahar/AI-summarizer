import { logoApp } from "../assets/index.js";
export default function Hero() {
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <nav className="mb-10 flex w-full items-center justify-between pt-3">
        <img src={logoApp} alt="the app logo" className="w-16 object-contain" />
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/Ferhatmedtahar/AI-summarizer")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with
        <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-sourse article summarizer
        that transforms long articles into clear and great easy to read
        summaries.
      </h2>
    </header>
  );
}
