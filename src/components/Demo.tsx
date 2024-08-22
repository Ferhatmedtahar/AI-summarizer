import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets/index";
import { useLazyGetSummaryQuery } from "../services/ArticleSlice";
export default function Demo() {
  type Article = {
    url: string;
    summary: string;
  };

  //copy to clipboard function
  const [copied, SetCopied] = useState<string | boolean>("");

  // article
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  //list of all articles
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  //lazygetsummary call hook from RTK ,
  //below this the handle submit logic and loading state for the app
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesString = localStorage.getItem("articles");

    if (articlesString !== null) {
      try {
        const articlesLocalStorage = JSON.parse(articlesString);
        setAllArticles(articlesLocalStorage);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        // Optionally handle JSON parse errors here
      }
    }
  }, []);

  //handle submit logic we send and get data back and we display the resault + store it
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      //structure the article and set it and the same before with all atricles
      const newArticle = { ...article, summary: data.summary };
      //structure all articles
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  }

  function handleCopy(copyUrl: string) {
    SetCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => SetCopied(false), 3000);
  }

  return (
    <section className="my-16 w-full max-w-xl">
      {/*search */}
      <div className="flex w-full flex-col gap-2">
        <form
          className="relative flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↲
          </button>
        </form>
        {/*browse url history */}
        <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
          {allArticles.map((item, index: number) => (
            <div
              className="link_card"
              key={`link-${index}`}
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="h-[40%] w-[40%] object-contain"
                />
              </div>
              <p className="flex-1 truncate font-satoshi text-sm text-blue-700">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/*display resault*/}

      <div className="my-10 flex max-w-full items-center justify-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loader"
            className="mt-14 h-20 w-20 object-contain"
          />
        ) : error ? (
          <p className="text-center font-inter font-bold text-black">
            something went wrong...
            <br />
            <span className="font-satoshi text-red-400">
              {(error as { data?: { error?: string } })?.data?.error ||
                "An unknown error occurred"}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi text-xl font-bold text-gray-700">
                Article <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter text-sm font-medium text-gray-800">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
