import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";
import PlausibleProvider from "next-plausible";

export default function Home() {
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [companyDescriptionInput, setCompanyDescriptionInput] = useState("");
  const [roleTitleInput, setRoleTitleInput] = useState("");
  const [roleDescriptionInput, setRoleDescriptionInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState();
  const divRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: companyNameInput,
        companyDescription: companyDescriptionInput,
        roleTitle: roleTitleInput,
        roleDescription: roleDescriptionInput,
        question: questionInput,
      }),
    });
    const data = await response.json();
    setResult(data.result);
    setIsLoading(false);
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <PlausibleProvider domain="whydoyouwanttoworkhere.com">
      <div>
        <Head>
          <title>Why do you want to work here?</title>
          <link rel="icon" href="/work.png" />
          <meta
            name="description"
            content="Generate answers to annoying interview application questions"
          />
          <meta
            property="og:description"
            content="Generate answers to annoying interview application questions"
          />
          <meta
            property="og:url"
            content="https://WhyDoYouWantToWorkHere.com"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Why Do You Want to Work Here?" />
          <meta
            property="og:site_name"
            content="Why do you want to work here?"
          />
          <meta
            property="og:image"
            content="https://WhyDoYouWantToWorkHere.com/work.png"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Why do you want to work here?" />
          <meta
            name="twitter:description"
            content="Generate answers to annoying interview application questions."
          />
          <meta
            name="twitter:image"
            content="https://WhyDoYouWantToWorkHere.com/work.png"
          />
          <meta name="twitter:image:alt" content="Work logo" />
        </Head>

        <main className={styles.main}>
          <img src="/work.png" className={styles.icon} />
          <h1>Why do you want to work here?</h1>
          <h2>Generate answers to annoying interview application questions</h2>
          <div className={styles.about}>
            by{" "}
            <a
              href="https://www.linkedin.com/in/liornn/"
            >
              Lior Neu-ner
            </a>
          </div>

          <form onSubmit={onSubmit}>
            <div className={styles.container}>
              Interview Application Question:
              <input
                required={true}
                minLength={0}
                type="text"
                name="question"
                placeholder="e.g Why do you want to work here?"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              />
            </div>
            <div className={styles.container}>
              Company Name:
              <input
                required={true}
                minLength={0}
                type="text"
                name="companyname"
                placeholder="e.g Netflix"
                value={companyNameInput}
                onChange={(e) => setCompanyNameInput(e.target.value)}
              />
            </div>
            <div className={styles.container}>
              {"Company Description (you can find it on Google):"}
              <textarea
                required={true}
                minLength={0}
                maxLength={700}
                type="text"
                name="companydescription"
                placeholder="e.g Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.

            You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week."
                value={companyDescriptionInput}
                onChange={(e) => setCompanyDescriptionInput(e.target.value)}
              />
            </div>

            <div className={styles.container}>
              Job Role:
              <input
                required={true}
                minLength={0}
                type="text"
                name="roletitle"
                placeholder="e.g Software Engineer"
                value={roleTitleInput}
                onChange={(e) => setRoleTitleInput(e.target.value)}
              />
            </div>

            <div className={styles.container}>
              Role Description:
              <textarea
                required={true}
                maxLength={700}
                minLength={0}
                type="text"
                name="roledescription"
                placeholder="e.g To provide the best possible streaming experience, we design algorithms that adapt audio and video qualities to ever changing network conditions, encoding profiles, UI features, and device capabilities. Our team comes from diverse backgrounds, has an equal gender ratio, and we have a wide range of expertise in computer networking, video streaming, data analysis, embedded system, and software engineering. We work highly cross functionally and jointly develop our algorithms with Instagram CDN, Encoding Technologies, Data Science & Engineering, Consumer Insights, and UI Engineering."
                value={roleDescriptionInput}
                onChange={(e) => setRoleDescriptionInput(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value={isLoading ? "Generating..." : "Generate Answer"}
              disabled={isLoading}
            />
          </form>

          <div className={styles.result} ref={divRef}>
            {result}
          </div>
        </main>
      </div>
    </PlausibleProvider>
  );
}
